import { createSlice } from "@reduxjs/toolkit";

const threadSlice = createSlice({
  name: "thread",
  initialState: {
    currentThread: "",
    messages: [],
  },
  reducers: {
    setCurrentThread: (state, action) => {
      state.currentThread = action.payload.currentThread;
    },
    setMessages: (state, action) => {
      state.messages = action.payload.messages;
    },
  },
});

export const { setCurrentThread, setMessages } = threadSlice.actions;
export const selectCurrentThread = (state) => state.thread.currentThread;
export const selectMessages = (state) => state.thread.messages;
export default threadSlice.reducer;
