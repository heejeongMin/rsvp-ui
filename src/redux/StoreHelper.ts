import { setToken } from "./LoginSlice.ts";
import store from "./Store.ts";

export const isUserLoggedIn = () => {
  let isLoggedIn = false;

  if (store.getState().login.token) {
    isLoggedIn = true;
  } else {
    const token = localStorage.getItem("token");
    const access_token = localStorage.getItem("access_token");

    if (token) {
      store.dispatch(
        setToken({
          token: token,
          sns_access_token: access_token,
        })
      );
      isLoggedIn = true;
    }
  }
  return isLoggedIn;
};
