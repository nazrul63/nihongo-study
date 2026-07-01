/**
 * ════════════════════════════════════════════════════
 *  FIREBASE CONFIG — fill this in before deploying
 * ════════════════════════════════════════════════════
 *
 * HOW TO GET YOUR CONFIG:
 * 1. Go to https://console.firebase.google.com
 * 2. Create a new project (e.g. "nihongo-study")
 * 3. Click "Add app" → Web → register
 * 4. Copy the firebaseConfig object below
 * 5. Enable Authentication → Sign-in method → Google → Enable
 * 6. Create Firestore Database → Start in production mode
 * 7. In Firestore → Rules → paste the security rules below
 * 8. In Authentication → Settings → Authorized domains
 *    → Add: nazrul63.github.io  (your GitHub Pages domain)
 *
 * FIRESTORE SECURITY RULES (paste in Firebase Console → Firestore → Rules):
 * ─────────────────────────────────────────────────────────────────────────
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     match /users/{userId}/{document=**} {
 *       allow read, write: if request.auth != null
 *                          && request.auth.uid == userId;
 *     }
 *   }
 * }
 * ─────────────────────────────────────────────────────────────────────────
 */
window.FIREBASE_CONFIG = {
  apiKey:            "IzaSyCYQ-STsMskTrWnjAaIZfHWPccu5N_aBaE",
  authDomain:        "nihongo-study-44759.firebaseapp.com",
  projectId:         "nihongo-study-44759",
  storageBucket:     "nihongo-study-44759.firebasestorage.app",
  messagingSenderId: "679137954280",
  appId:             "1:679137954280:web:ebe3a38ed6da96ae30fc5d",
  measurementId: "G-2H415ZXZZ5"
};
