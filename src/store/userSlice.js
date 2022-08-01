import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "services/firebase";

export const fetchAllUsers = createAsyncThunk("user", async () => {
  try {
    const q = query(collection(db, "users"));
    const usersArraySnapshot = await getDocs(q);
    return usersArraySnapshot.docs.map((i) => i.data());
  } catch (e) {}
});

const initialState = {
  allUsers: [],
  loading: null,
  error: null,
  currentUser: {
    uid: "",
    avatar: "",
    email: "",
    displayName: "",
  },
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logOutUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: {
    [fetchAllUsers.pending]: (state) => {
      state.loading = "loading";
      state.error = null;
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.loading = null;
      state.allUsers = action.payload;
    },
    [fetchAllUsers.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload;
    },
  },
});

export const { setUser, logOutUser } = userSlice.actions;
export const selectUserState = (state) => state.users.currentUser;
export const selectAllUsers = (state) => state.users.allUsers;
export default userSlice.reducer;
