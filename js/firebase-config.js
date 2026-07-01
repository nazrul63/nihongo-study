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
// window.FIREBASE_CONFIG = {
//   apiKey: "AIzaSyCYQ-STsMskTrWnjAaIZfHWPccu5N_aBaE",
//   authDomain: "nihongo-study-44759.firebaseapp.com",
//   projectId: "nihongo-study-44759",
//   storageBucket: "nihongo-study-44759.firebasestorage.app",
//   messagingSenderId: "679137954280",
//   appId: "1:679137954280:web:ebe3a38ed6da96ae30fc5d",
//   measurementId: "G-2H415ZXZZ5"
// };

<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCYQ-STsMskTrWnjAaIZfHWPccu5N_aBaE",
    authDomain: "nihongo-study-44759.firebaseapp.com",
    projectId: "nihongo-study-44759",
    storageBucket: "nihongo-study-44759.firebasestorage.app",
    messagingSenderId: "679137954280",
    appId: "1:679137954280:web:ebe3a38ed6da96ae30fc5d",
    measurementId: "G-2H415ZXZZ5"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
