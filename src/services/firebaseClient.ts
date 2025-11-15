// Firebase client SDK helpers (optional - not used in current setup with local JSON database)
// To use these, install firebase: npm install firebase
// Then uncomment the imports below

/*
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, collection, addDoc, setDoc, deleteDoc } from 'firebase/firestore';

// Client-side Firebase initialization (for direct client reads/writes if desired)
// NOTE: for secure writes you should use the admin API above or Cloud Functions

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || '<YOUR_API_KEY>',
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || '<YOUR_AUTH_DOMAIN>',
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || '<YOUR_PROJECT_ID>',
};

let app;
let db;

export function initFirebaseClient(cfg?: any) {
  const conf = cfg || firebaseConfig;
  app = initializeApp(conf);
  db = getFirestore(app);
  return db;
}

export function getDbClient() {
  if (!db) initFirebaseClient();
  return db;
}

export async function addTeacherClient(data: { name: string; email: string }) {
  const db = getDbClient();
  return await addDoc(collection(db, 'teachers'), { ...data, createdAt: new Date().toISOString() });
}

export async function addStudentClient(data: { name: string }) {
  const db = getDbClient();
  return await addDoc(collection(db, 'students'), { ...data, createdAt: new Date().toISOString() });
}

export async function saveAttendanceClient(courseId: string, records: any) {
  const db = getDbClient();
  return await addDoc(collection(db, 'attendance'), { courseId, records, date: new Date().toISOString() });
}
*/

// Current setup uses API endpoints in src/services/api.ts
export default {};

