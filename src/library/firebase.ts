import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { enableIndexedDbPersistence, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDifZTN4vJrtepb_h_choo_HcgeHodpDck",
  authDomain: "real-time-chat-applicati-b3a2f.firebaseapp.com",
  projectId: "real-time-chat-applicati-b3a2f",
  storageBucket: "real-time-chat-applicati-b3a2f.appspot.com",
  messagingSenderId: "475695572522",
  appId: "1:475695572522:web:433d7affa179bebad98553",
  measurementId: "G-43QMCSFCM8"
};

const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);

enableIndexedDbPersistence(firebaseDb, { forceOwnership: false });
