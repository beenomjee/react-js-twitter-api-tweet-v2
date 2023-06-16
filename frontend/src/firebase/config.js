import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPrNkY25lffQxZ1xj9p0dBjDMH32iD0SI",
  authDomain: "react-js-twitter-login.firebaseapp.com",
  projectId: "react-js-twitter-login",
  storageBucket: "react-js-twitter-login.appspot.com",
  messagingSenderId: "222552737868",
  appId: "1:222552737868:web:cc619c228226fc39e38ce9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
