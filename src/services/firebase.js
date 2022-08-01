import { initializeApp } from "firebase/app";
import {
  addDoc,
  arrayUnion,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  setDoc,
  doc,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { fetchThreads, setMessages } from "store/threadSlice";

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

export const createThread = async ({ userArray, createdBy, name, type }) => {
  const thread = {
    // createdAt: new Date(),
    createdBy,
    members: arrayUnion(createdBy),
    name,
    type,
  };
  return await addDoc(collection(db, "threads"), thread);
};

export const fetchThreadsByUserID = async (uid) => {
  const q = query(
    collection(db, "threads"),
    where("members", "array-contains", uid)
  );
  const snapShot = await getDocs(q);
  return snapShot.docs.reduce((acc, doc) => {
    const data = doc.data();
    data.id = doc.id;
    acc.push(data);
    return acc;
  }, []);
};

export const searchThreadsByName = async (name) => {
  const q = query(collection(db, "threads"), where("name", "==", name));

  const querySnapshot = await getDocs(q);
  const arr = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    arr.push(doc.data());
  });
  console.log(arr);
};

export const postMessage = async (messageText, currentThread, currentUser) => {
  try {
    if (messageText.trim()) {
      const message = {
        messageText,
        sentAt: new Date(),
        sentBy: currentUser,
      };
      const messageRef = collection(db, `message/${currentThread}/messages`);
      return await addDoc(messageRef, message);
    }
  } catch (e) {
    alert(e.message);
  }
};
