import { configureStore } from "@reduxjs/toolkit";
import userSlice from "store/userSlice";
import threadSlice from "store/threadSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    thread: threadSlice,
  },
});
