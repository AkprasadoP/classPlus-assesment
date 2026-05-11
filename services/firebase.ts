import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

let app, db: any, storage: any;

try {
  if (firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    storage = getStorage(app);
    console.log('Firebase initialized successfully.');
  } else {
    console.warn('Firebase configuration missing. Using mock fallback.');
  }
} catch (error) {
  console.warn('Firebase initialization failed. Using mock fallback.', error);
}

export { db, storage };

export const mockAuth = {
  signInAnonymously: () => Promise.resolve({ user: { uid: 'guest123' } }),
};
