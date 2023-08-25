import { getFirestore } from "firebase-admin/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyAXXYsxfFEFIChD-vqdLDRj-HkmIQiri_8",
  authDomain: "controlpoints04.firebaseapp.com",
  projectId: "controlpoints04",
  storageBucket: "controlpoints04.appspot.com",
  messagingSenderId: "673711938732",
  appId: "1:673711938732:web:9128889cc4e310b4a55309",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();

export { app, db };
