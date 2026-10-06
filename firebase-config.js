// Load from environment when available (server/deploy); fall back to placeholder for local dev
const apiKey = (typeof process !== 'undefined' && process.env && process.env.FIREBASE_API_KEY) ? process.env.FIREBASE_API_KEY : 'your_api_key_here';
const authDomain = (typeof process !== 'undefined' && process.env && process.env.FIREBASE_AUTH_DOMAIN) ? process.env.FIREBASE_AUTH_DOMAIN : 'tic-tac-toe-uxplorers.firebaseapp.com';
const projectId = (typeof process !== 'undefined' && process.env && process.env.FIREBASE_PROJECT_ID) ? process.env.FIREBASE_PROJECT_ID : 'tic-tac-toe-uxplorers';
const storageBucket = (typeof process !== 'undefined' && process.env && process.env.FIREBASE_STORAGE_BUCKET) ? process.env.FIREBASE_STORAGE_BUCKET : 'tic-tac-toe-uxplorers.firebasestorage.app';
const messagingSenderId = (typeof process !== 'undefined' && process.env && process.env.FIREBASE_MESSAGING_SENDER_ID) ? process.env.FIREBASE_MESSAGING_SENDER_ID : '726677813927';
const appId = (typeof process !== 'undefined' && process.env && process.env.FIREBASE_APP_ID) ? process.env.FIREBASE_APP_ID : '1:726677813927:web:2390b6d1b63ffc81bc3982';
const measurementId = (typeof process !== 'undefined' && process.env && process.env.FIREBASE_MEASUREMENT_ID) ? process.env.FIREBASE_MEASUREMENT_ID : 'G-MQ5PJHY0GJ';

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
};

// Security note: apiKey is a client-side public identifier; do NOT expose service account keys here.
// Store secrets in Vercel Environment Variables or .env (never commit real keys).

module.exports = { firebaseConfig };
