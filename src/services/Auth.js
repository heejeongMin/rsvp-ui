import axios from "axios";
import qs from "qs";
import store from "../redux/Store.ts";
import { setToken } from "../redux/LoginSlice.ts";

const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URL = process.env.REACT_APP_KAKAO_REDIRECT_URL;
const KAKAO_CLIENT_SECRET = process.env.REACT_APP_KAKAO_CLIENT_SECRET;
const KAKAO_CLINET_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
const KAKAO_AUTH_URL = process.env.REACT_APP_KAKAO_AUTH_URL;
const KAKAO_TOKEN_URL = process.env.REACT_APP_KAKAO_TOKEN_URL;
const KAKAO_USER_INFO_URL = process.env.REACT_APP_KAKAO_USER_INFO_URL;
const KAKAO_LOGOUT_URL = process.env.REACT_APP_KAKAO_LOGOUT_URL;
const RSVP_LOGIN_URL = process.env.REACT_APP_RSVP_LOGIN_URL;
const RSVP_LOGOUT_URL = process.env.REACT_APP_RSVP_LOGOUT_URL;

export const login = async () => {
  window.location.replace(
    `${KAKAO_AUTH_URL}?client_id=${KAKAO_CLINET_ID}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`
  );
};

export const getToken = async (code) => {
  var result = "failed";

  try {
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: KAKAO_REST_API_KEY,
      redirect_uri: KAKAO_REDIRECT_URL,
      code: code,
      client_secret: KAKAO_CLIENT_SECRET,
      response_type: "code",
      scope: "profile_nickname",
    });

    const res = await axios.post(`${KAKAO_TOKEN_URL}`, payload);

    const userInfo = await axios.get(`${KAKAO_USER_INFO_URL}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: `Bearer ${res.data.access_token}`,
      },
    });

    const token = await axios.post(
      `${RSVP_LOGIN_URL}`,
      {
        id: userInfo.data.id,
        nickName: userInfo.data.kakao_account.profile.nickname,
        issuer: "KAKAO",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${res.data.id_token}`,
        },
      }
    );

    store.dispatch(
      setToken({
        token: token.data,
        sns_access_token: res.data.access_token,
      })
    );
    result = "success";
  } catch (err) {
    console.log(err);
  }

  return result;
};

export const logout = async () => {
  var result = "failed";

  try {
    const res = await axios.post(`${KAKAO_LOGOUT_URL}`, null, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: `Bearer ${
          store.getState().login.token.sns_access_token
        }`,
      },
    });

    console.log(RSVP_LOGOUT_URL);

    await axios
      .post(
        `${RSVP_LOGOUT_URL}`,
        { snsId: res.data.id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.getState().login.token.token,
          },
        }
      )
      .then(() => {
        result = "success";
        store.dispatch(setToken(null));
      });
  } catch (err) {
    console.log(err);
  }

  return result;
};
