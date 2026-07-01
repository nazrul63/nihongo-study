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
  apiKey:            "PASTE_YOUR_API_KEY_HERE",
  authDomain:        "PASTE_YOUR_AUTH_DOMAIN_HERE",
  projectId:         "PASTE_YOUR_PROJECT_ID_HERE",
  storageBucket:     "PASTE_YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "PASTE_YOUR_MESSAGING_SENDER_ID_HERE",
  appId:             "PASTE_YOUR_APP_ID_HERE"
};
