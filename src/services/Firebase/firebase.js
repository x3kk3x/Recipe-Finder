import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAVGDcHQqLmwDjQcr_m0wSsRPKY75UV8Fg",
  authDomain: "recipe-finder-a15b3.firebaseapp.com",
  projectId: "recipe-finder-a15b3",
  storageBucket: "recipe-finder-a15b3.appspot.com",
  messagingSenderId: "709470990934",
  appId: "1:709470990934:web:6526f424778900f792c1f7",
  measurementId: "G-7QJVCMML0S"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth };
