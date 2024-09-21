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
      return state;
    },
  },
});

export default loginSlice;
export const { setToken } = loginSlice.actions;
