import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC3i_3rTugkLkps83CdSz0eC25VchL6bvQ",
  authDomain: "entrans-selfservice.firebaseapp.com",
  projectId: "entrans-selfservice",
  databaseURL: "",
  storageBucket: "entrans-selfservice.appspot.com",
  messagingSenderId: "1040776697835",
  appId: "1:1040776697835:web:00f26b0ed1e3a668142bae",
  measurementId: "G-R6B5DCL38M",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
