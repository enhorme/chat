import React from "react";
import {
  setDoc,
  doc,
  collection,
  addDoc,
  query,
  where,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "services/firebase";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectUserState } from "store/userSlice";

export default () => {
  const user = useSelector(selectUserState);
  async function handleClick() {
    const value = prompt("entering the thread name");
    if (value) {
      const docRef = await addDoc(collection(db, "threads"), {
        threadName: value,
        createdBy: user.uid,
      });
      console.log(docRef);

      const userThreadsRef = doc(db, "users", user.uid);
      await updateDoc(userThreadsRef, {
        threads: arrayUnion(docRef.id),
      });
    }
  }

  return (
    <div className="thread__add">
      <div className="thread__icon">
        <AiOutlineAppstoreAdd onClick={handleClick} />
      </div>
    </div>
  );
};
