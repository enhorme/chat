import React, { useEffect, useRef } from "react";
import AddMessage from "components/AddMessage";
import "./_dialog.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentThread,
  selectMessages,
  setMessages,
} from "store/threadSlice";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "services/firebase";
import { selectUserState } from "store/userSlice";

export default () => {
  const currentThread = useSelector(selectCurrentThread);
  const user = useSelector(selectUserState);
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);

  const bodyRef = useRef(null);

  useEffect(() => {
    scrollToMyRef();
    console.log("scroll");
  }, [currentThread]);

  useEffect(() => {
    if (currentThread) {
      const q = query(
        collection(db, `threads/${currentThread}/messages`),
        orderBy("timestamp")
      );
      const unsub = onSnapshot(q, (snap) => {
        const messagesArray = snap.docs.map((i) => {
          const data = i.data();
          data.timestamp = data.timestamp?.seconds;
          return data;
        });
        dispatch(setMessages({ messages: messagesArray }));
      });
      return () => unsub();
    }
  }, [currentThread, dispatch]);

  function scrollToMyRef() {
    const scroll = bodyRef.current.scrollHeight - bodyRef.current.clientHeight;
    bodyRef.current.scrollTo(0, scroll);
  }

  return (
    <section className="dialog">
      <div className="dialog__header">fw</div>
      <div className="dialog__body" ref={bodyRef}>
        {messages?.map((i, idx) => {
          return (
            <div
              key={idx}
              className={
                i.uid === user.uid ? "message message-right" : "message"
              }
            >
              <div className="message__avatar">
                <img src={i.avatar} alt="avatar" referrerPolicy="no-referrer" />
              </div>
              <div className="message_text">
                <pre>{i.message}</pre>
              </div>
            </div>
          );
        })}
      </div>
      <div className="dialog__actions">
        <AddMessage scrollToMyRef={scrollToMyRef} />
      </div>
    </section>
  );
};
