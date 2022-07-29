import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2WIdgfo2pS-KTfNUCukmSdbJ1cMdCu8w",
  authDomain: "chat-pro-3c67f.firebaseapp.com",
  projectId: "chat-pro-3c67f",
  storageBucket: "chat-pro-3c67f.appspot.com",
  messagingSenderId: "1028894933492",
  appId: "1:1028894933492:web:54a85b3c7ad8b2fc1bf9a1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider };
