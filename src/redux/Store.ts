import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "./LoginSlice.ts";

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
});

export const rootReducer = combineReducers({
  loginSlice,
});

export default store;
