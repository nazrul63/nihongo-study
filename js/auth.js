/* ═══════════════════════════════════════════════════════
   auth.js — Firebase Authentication + Firestore sync
   Loaded AFTER firebase-config.js
   ═══════════════════════════════════════════════════════ */

/* ── Init Firebase ── */
const cfg = window.FIREBASE_CONFIG;
const isConfigured = cfg && cfg.apiKey && !cfg.apiKey.includes('PASTE');

let db = null, auth = null, currentUser = null;

if (isConfigured) {
  firebase.initializeApp(cfg);
  auth = firebase.auth();
  db   = firebase.firestore();
  db.settings({ merge: true });
}

/* ══════════════════ FIRESYNC ══════════════════
   Thin layer between the app's Store and Firestore.
   - push(): after every local save, sync to cloud
   - pullAll(): on login, load cloud data → localStorage
   ═══════════════════════════════════════════════ */
const FireSync = {
  /* Push one localStorage key to Firestore */
  push(localKey, value) {
    if (!db || !currentUser) return;
    const uid = currentUser.uid;
    // nhk_v_1 → vocab/1   nhk_q_1 → quiz/1   nhk_theme → settings/theme
    let coll, docId;
    if (localKey.startsWith('nhk_v_')) {
      coll = 'vocab'; docId = localKey.replace('nhk_v_', '');
    } else if (localKey.startsWith('nhk_q_')) {
      coll = 'quiz';  docId = localKey.replace('nhk_q_', '');
    } else if (localKey === 'nhk_theme') {
      coll = 'settings'; docId = 'theme';
    } else return;

    db.collection('users').doc(uid)
      .collection(coll).doc(docId)
      .set(typeof value === 'string' ? { value } : value)
      .catch(e => console.warn('FireSync push failed:', e));
  },

  /* Pull all user data from Firestore → localStorage, then refresh UI */
  async pullAll() {
    if (!db || !currentUser) return;
    const uid = currentUser.uid;
    const base = db.collection('users').doc(uid);
    try {
      // Vocab progress
      const vocabSnap = await base.collection('vocab').get();
      vocabSnap.forEach(d => localStorage.setItem(`nhk_v_${d.id}`, JSON.stringify(d.data())));
      // Quiz scores
      const quizSnap = await base.collection('quiz').get();
      quizSnap.forEach(d => localStorage.setItem(`nhk_q_${d.id}`, JSON.stringify(d.data())));
      // Theme
      const themeDoc = await base.collection('settings').doc('theme').get();
      if (themeDoc.exists) {
        const t = themeDoc.data().value;
        localStorage.setItem('nhk_theme', t);
        document.documentElement.setAttribute('data-theme', t);
      }
    } catch(e) {
      console.warn('FireSync pullAll failed:', e);
    }
  }
};

/* ══════════════════ AUTH UI ══════════════════ */
function showLoginScreen() {
  const ls = document.getElementById('login-screen');
  if (ls) ls.style.display = 'flex';
}
function hideLoginScreen() {
  const ls = document.getElementById('login-screen');
  if (ls) ls.style.display = 'none';
}

function updateHeaderUser(user) {
  const area = document.getElementById('user-area');
  if (!area) return;
  if (user) {
    area.innerHTML = `
      <img src="${user.photoURL || ''}" class="user-avatar" alt="${user.displayName}"
           onerror="this.style.display='none'" />
      <span class="user-name">${user.displayName?.split(' ')[0] || 'User'}</span>
      <button class="sign-out-btn" onclick="signOutUser()">Sign out</button>`;
  } else {
    area.innerHTML = `<button class="sign-in-btn" onclick="signInWithGoogle()">Sign in</button>`;
  }
}

/* ── Google sign-in ── */
async function signInWithGoogle() {
  if (!auth) {
    alert('Firebase is not configured yet.\nPlease fill in js/firebase-config.js first.');
    return;
  }
  const btn = document.getElementById('google-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Signing in…'; }
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      await auth.signInWithRedirect(provider);
    } else {
      await auth.signInWithPopup(provider);
    }
  } catch(e) {
    if (btn) { btn.disabled = false; btn.textContent = 'Sign in with Google'; }

    // Friendly diagnosis for the most common errors
    let msg = 'Sign-in failed.\n\n';
    if (e.code === 'auth/api-key-not-valid' || e.code === 'auth/invalid-api-key') {
      msg += '🔑 API key issue. Check two things:\n'
           + '1. Firebase Console → Authentication → Settings\n'
           + '   → Authorized domains → add "' + location.hostname + '"\n\n'
           + '2. Make sure all 6 values in firebase-config.js\n'
           + '   are pasted correctly with no extra spaces.';
    } else if (e.code === 'auth/popup-blocked') {
      msg += '🚫 Popup blocked by browser.\n'
           + 'Allow popups for this site and try again,\n'
           + 'or use a different browser.';
    } else if (e.code === 'auth/popup-closed-by-user') {
      return; // user cancelled, no alert needed
    } else if (e.code === 'auth/unauthorized-domain') {
      msg += '🌐 Domain not authorized.\n'
           + 'Firebase Console → Authentication → Settings\n'
           + '→ Authorized domains → Add: "' + location.hostname + '"';
    } else {
      msg += e.message + '\n\nCode: ' + e.code;
    }
    alert(msg);
  }
}

async function signOutUser() {
  if (!auth) return;
  try {
    await auth.signOut();
  } catch(e) { console.error(e); }
}

/* ── Auth state listener ── */
if (auth) {
  /* Handle redirect result (mobile) */
  auth.getRedirectResult().catch(() => {});

  auth.onAuthStateChanged(async user => {
    currentUser = user;
    updateHeaderUser(user);

    if (user) {
      hideLoginScreen();
      showSyncBanner('Syncing your progress…');
      await FireSync.pullAll();
      hideSyncBanner();
      /* Refresh sidebar and current lesson if app is ready */
      if (typeof buildSidebar === 'function') {
        buildSidebar();
        if (typeof S !== 'undefined' && S.lessonId && typeof renderLesson === 'function') {
          renderLesson();
        }
      }
    } else {
      showLoginScreen();
    }
  });
} else {
  /* Firebase not configured — run in local-only mode */
  hideLoginScreen();
  console.info('Running in local-only mode (Firebase not configured).');
}

/* ── Sync status banner ── */
function showSyncBanner(msg) {
  let b = document.getElementById('sync-banner');
  if (!b) {
    b = document.createElement('div');
    b.id = 'sync-banner';
    b.className = 'sync-banner';
    document.body.appendChild(b);
  }
  b.textContent = msg;
  b.style.display = 'block';
}
function hideSyncBanner() {
  const b = document.getElementById('sync-banner');
  if (b) b.style.display = 'none';
}
