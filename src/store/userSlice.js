import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: "",
  avatar: "",
  email: "",
  displayName: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    logOutUser: () => {
      return initialState;
    },
  },
});

export const { setUser, logOutUser } = userSlice.actions;
export const selectUserState = (state) => state.user;
export default userSlice.reducer;
