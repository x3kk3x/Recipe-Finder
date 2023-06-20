import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  // Your Firebase project configuration
  apiKey: "AIzaSyAVGDcHQqLmwDjQcr_m0wSsRPKY75UV8Fg",
  authDomain: "recipe-finder-a15b3.firebaseapp.com",
  projectId: "recipe-finder-a15b3",
  // ...other configuration properties
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get Firebase auth and firestore references
const auth = firebase.auth();
const firestore = firebase.firestore();

// Export Firebase services
export { auth, firestore };
