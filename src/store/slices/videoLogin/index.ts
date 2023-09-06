import { createSlice } from "@reduxjs/toolkit";

import { setNewVideo } from "../../services/news";

export const videoLogin = createSlice({
  name: "video_login",
  initialState: localStorage.getItem("video")
    ? localStorage.getItem("video")
    : "",
  reducers: {
    setVideo: (state, action) => {
      setNewVideo(action.payload);
      return action.payload;
    },
  },
});

export const { setVideo } = videoLogin.actions;
export default videoLogin.reducer;
