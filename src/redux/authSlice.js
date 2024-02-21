import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logging: !!localStorage.getItem("accessToken"),
  userId: localStorage.getItem("userId"),
  avatar: localStorage.getItem("avatar"),
  nickname: localStorage.getItem("nickname"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { accessToken, userId, nickname, avatar } = action.payload;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", userId);
      localStorage.setItem("avatar", avatar);
      localStorage.setItem("nickname", nickname);
      state.userId = userId;
      state.logging = true;
      state.avatar = avatar;
      state.nickname = nickname;
    },
    logout: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("avatar");
      localStorage.removeItem("nickname");
      state.logging = false;
      state.userId = null;
      state.avatar = null;
      state.nickname = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
