import firebase, { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
 
  apiKey: "AIzaSyDThlrZ4Sv4OXyqT9ZX-aVMHiIfnVtXhZ4",
  authDomain: "staydesk-1a5ca.firebaseapp.com",
  projectId: "staydesk-1a5ca",
  storageBucket: "staydesk-1a5ca.appspot.com",
  messagingSenderId: "168038571684",
  appId: "1:168038571684:web:e7041b4f5d776764ce9031",
  measurementId: "G-Q5DS29GB2V"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)