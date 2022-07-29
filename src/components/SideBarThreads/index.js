import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "services/firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectUserState } from "store/userSlice";
import { selectCurrentThread, setCurrentThread } from "store/threadSlice";

export default () => {
  const [threads, setThreads] = useState([]);
  const user = useSelector(selectUserState);
  const currentThread = useSelector(selectCurrentThread);
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(collection(db, "threads"));
    const unsub = onSnapshot(q, (snapshot) => {
      const array = snapshot.docs.reduce((acc, i) => {
        if (user.threads.includes(i.id)) {
          acc.push(i);
          return acc;
        } else return acc;
      }, []);
      setThreads(array);
    });

    return () => unsub();
  }, [user.threads]);

  function handleSelectThread(id) {
    dispatch(setCurrentThread({ currentThread: id }));
  }

  return (
    <div>
      {threads?.map((i, idx) => (
        <div
          key={idx}
          className="thread"
          style={{ background: currentThread === i.id ? "orange" : "" }}
          onClick={() => handleSelectThread(i.id)}
        >
          {i.data().threadName}
        </div>
      ))}
    </div>
  );
};
