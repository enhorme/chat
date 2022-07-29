import React, {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { selectUserState } from "store/userSlice";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "services/firebase";
import "./styles.scss";
import { selectCurrentThread } from "store/threadSlice";

const AddMessage = ({ scrollToMyRef }) => {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const formRef = useRef(null);
  const user = useSelector(selectUserState);
  const currentThread = useSelector(selectCurrentThread);

  async function handleSubmit(e) {
    e.preventDefault();
    if (currentThread) {
      const messageRef = collection(db, `threads/${currentThread}/messages`);
      await addDoc(messageRef, {
        message: value,
        displayName: user.displayName,
        avatar: user.avatar,
        uid: user.uid,
        timestamp: serverTimestamp(),
      });
      setValue("");
      scrollToMyRef();
    }
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  function onEnterPress(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      formRef.current.requestSubmit();
    }
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef} className="send-form">
      <textarea
        className="send-form__input"
        style={{ whiteSpace: "pre-wrap" }}
        value={value}
        onChange={handleChange}
        ref={inputRef}
        onKeyDown={onEnterPress}
      />
      <button type="submit" className="send-form__button">
        Submit
      </button>
    </form>
  );
};

export default AddMessage;
