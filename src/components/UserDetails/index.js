import React from "react";
import { useSelector } from "react-redux";
import { selectUserState } from "store/userSlice";
import "./_user-details.scss";

export default () => {
  const { displayName, uid, avatar } = useSelector(selectUserState);
  return (
    <div className="user">
      <div className="user__avatar">
        <img
          referrerPolicy="no-referrer"
          src={avatar}
          alt=""
          className="user__image"
        />
      </div>
      <div className="user__icons-group"></div>
    </div>
  );
};
