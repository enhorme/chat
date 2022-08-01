import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserState } from "store/userSlice";
import {
  fetchUserThreads,
  selectCurrentThread,
  selectThreadsByUserId,
  setCurrentThread,
} from "store/threadSlice";

export default () => {
  const user = useSelector(selectUserState);
  const currentThread = useSelector(selectCurrentThread);
  const threads = useSelector(selectThreadsByUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.uid) dispatch(fetchUserThreads(user.uid));
  }, [dispatch, user.uid]);

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
          {i.name}
        </div>
      ))}
    </div>
  );
};
