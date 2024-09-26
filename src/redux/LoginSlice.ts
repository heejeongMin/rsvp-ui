import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: "",
    sns_access_token: "",
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      window.localStorage.setItem("token", action.payload.token);
      window.localStorage.setItem(
        "access_token",
        action.payload.sns_access_token
      );

      return state;
    },
  },
});

export default loginSlice;
export const { setToken } = loginSlice.actions;
