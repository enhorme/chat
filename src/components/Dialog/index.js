import React, { useEffect, useRef } from "react";
import AddMessage from "components/AddMessage";
import "./_dialog.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessages,
  selectCurrentThread,
  selectMessages,
} from "store/threadSlice";

import { selectAllUsers, selectUserState } from "store/userSlice";
import { getUserById } from "services/utils";

export default () => {
  const currentThread = useSelector(selectCurrentThread);
  const currentUser = useSelector(selectUserState);
  const allUsers = useSelector(selectAllUsers);
  const messages = useSelector(selectMessages);
  const dispatch = useDispatch();

  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) scrollToMyRef();
  }, [messages]);

  useEffect(() => {
    if (currentThread) {
      dispatch(fetchMessages(currentThread));
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
                i.sentBy === currentUser.uid
                  ? "message message-right"
                  : "message"
              }
            >
              <div className="message__avatar">
                <img
                  src={getUserById(allUsers, i.sentBy).avatar}
                  alt="avatar"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="message_text">
                <pre>{i.messageText}</pre>
              </div>
            </div>
          );
        })}
      </div>
      <div className="dialog__actions">
        {currentThread?.members?.includes(currentUser) ? (
          "You can't read messages at this thread until you subscribe"
        ) : (
          <AddMessage scrollToMyRef={scrollToMyRef} />
        )}
      </div>
    </section>
  );
};
