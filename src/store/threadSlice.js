import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db, fetchThreadsByUserID } from "services/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export const fetchUserThreads = createAsyncThunk(
  "thread/fetchThreads",
  async function (id, { rejectWithValue }) {
    try {
      return await fetchThreadsByUserID(id);
    } catch (e) {
      return rejectWithValue(e.messages);
    }
  }
);

export const searchThreads = createAsyncThunk(
  "thread/fetchThreads",
  async function (id, { rejectWithValue }) {
    try {
      return await fetchThreadsByUserID(id);
    } catch (e) {
      return rejectWithValue(e.messages);
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "thread/messages",
  async function (currentThread, { rejectWithValue, dispatch }) {
    try {
      const q = query(
        collection(db, `message/${currentThread}/messages`),
        orderBy("sentAt")
      );
      onSnapshot(q, (snap) => {
        const arr = snap.docs.map((i) => {
          const data = i.data();
          data.sentAt = data.sentAt?.seconds;
          return data;
        });
        dispatch(setMessages({ messages: arr }));
      });
    } catch (e) {
      return rejectWithValue(e.messages);
    }
  }
);

export const fetchAllThreads = createAsyncThunk("threads/fetch", {});

const threadSlice = createSlice({
  name: "thread",
  initialState: {
    currentThread: "",
    messages: [],
    loading: false,
    error: false,
    userThreads: [],
    allThreads: [],
  },
  reducers: {
    setCurrentThread: (state, action) => {
      state.currentThread = action.payload.currentThread;
    },
    setMessages: (state, action) => {
      state.messages = action.payload.messages;
    },
  },
  extraReducers: {
    [fetchUserThreads.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchUserThreads.fulfilled]: (state, action) => {
      state.userThreads = action.payload;
    },
    [fetchUserThreads.rejected]: (state, action) => {
      state.error = true;
    },
  },
});

export const { setCurrentThread, setMessages } = threadSlice.actions;
export const selectCurrentThread = (state) => state.thread.currentThread;
export const selectMessages = (state) => state.thread.messages;
export const selectThreadsByUserId = (state) => state.thread.userThreads;
export default threadSlice.reducer;
