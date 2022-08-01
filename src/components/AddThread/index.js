import React from "react";

import { createThread } from "services/firebase";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { selectUserState } from "store/userSlice";
import { fetchUserThreads } from "store/threadSlice";

export default () => {
  const user = useSelector(selectUserState);
  const dispatch = useDispatch();
  async function handleClick() {
    const value = prompt("entering the thread name");
    if (value) {
      const data = {
        userArray: undefined,
        createdBy: user.uid,
        name: value,
        type: 1,
      };
      createThread(data)
        .then(() => dispatch(fetchUserThreads(user.uid)))
        .catch((e) => alert(e.message));
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
