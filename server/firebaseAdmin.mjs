import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

let appInitialized = false;

export function initFirebase() {
  if (appInitialized) return admin.firestore();

  const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.resolve('./server/serviceAccountKey.json');
  const databaseURL = process.env.FIREBASE_RTDB_URL || process.env.FIREBASE_DATABASE_URL || process.env.VITE_FIREBASE_DATABASE_URL || null;
  if (!fs.existsSync(credPath)) {
    console.warn('[firebaseAdmin] No service account found at', credPath);
    console.warn('[firebaseAdmin] Set env var GOOGLE_APPLICATION_CREDENTIALS or place serviceAccountKey.json in /server');
  }

  try {
    if (admin.apps.length === 0) {
      if (process.env.GOOGLE_APPLICATION_CREDENTIALS && fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
        const opts = { credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS) };
        if (databaseURL) opts.databaseURL = databaseURL;
        admin.initializeApp(opts);
      } else if (fs.existsSync(credPath)) {
        const serviceAccount = JSON.parse(fs.readFileSync(credPath, 'utf8'));
        const opts = { credential: admin.credential.cert(serviceAccount) };
        if (databaseURL) opts.databaseURL = databaseURL;
        admin.initializeApp(opts);
      } else {
        // Initialize with default credentials (useful when deployed on GCP)
        const opts = {};
        if (databaseURL) opts.databaseURL = databaseURL;
        admin.initializeApp(opts);
      }
    }
    appInitialized = true;
    console.log('[firebaseAdmin] Firebase admin initialized');
      return admin.firestore();
  } catch (err) {
    console.error('[firebaseAdmin] Error initializing Firebase admin:', err);
    throw err;
  }
}

export function getDb() {
  if (!appInitialized) initFirebase();
  return admin.firestore();
}

  export function getRTDB() {
    if (!appInitialized) initFirebase();
    try {
      return admin.database();
    } catch (err) {
      console.warn('[firebaseAdmin] Realtime Database not configured or unavailable:', err.message || err);
      return null;
    }
  }
