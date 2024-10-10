import { CreateRSVPRequest } from "../models/req/CreateRSVPRequest.ts";
import axios, { AxiosResponse } from "axios";
import store from "../redux/Store.ts";
import { GetActiveRSVPListResponse } from "../models/res/GetActiveRSVPListResponse.ts";
import { GetHistoryRSVPResponse } from "../models/res/GetHistoryRSVPResponse";
import { GetRSVPResponse } from "../models/res/GetRSVPResponse.ts";
import { ResponseWrapper } from "../models/res/ResponseWapper.ts";
import { GuestRSVPRequest } from "../models/req/GuestRSVPRequest.ts";
import { ServiceException } from "../models/res/ServiceException.ts";
import { logout } from "./Auth.js";

const RSVP_HOST = process.env.REACT_APP_RSVP_HOST;
const RSVP_BASE_URL = process.env.REACT_APP_RSVP_BASE_URL;
const RSVP_COMMON_URI = process.env.REACT_APP_RSVP_COMMON_URI;
const RSVP_HISTORY_URI = process.env.REACT_APP_RSVP_HISTORY_URI;
const RSVP_FORM_URI = process.env.REACT_APP_RSVP_FORM_URI;
const RSVP_RESPONSE_URI = process.env.REACT_APP_RSVP_RESPONSE_URI;

export const getActiveRSVPListApi = async () => {
  let error;
  let activeRSVPs: AxiosResponse<GetActiveRSVPListResponse> = await axios
    .get(`${RSVP_BASE_URL}${RSVP_COMMON_URI}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.getState().login.token.token}`,
      },
    })
    .catch(function (e) {
      let serviceException = e.response.data;

      if (
        serviceException.code === "UNAUTHORIZED" &&
        serviceException.resultCode === "TOKEN_EXPIRED"
      ) {
        error = serviceException.code;
        // logout();
      }
      console.error(serviceException);
    });

  if (error) {
    return error;
  } else {
    return activeRSVPs.data;
  }
};

export const getActiveRSVPApi = async (path: string) => {
  let res: AxiosResponse<ResponseWrapper> = await axios
    .get(`${RSVP_BASE_URL}${RSVP_COMMON_URI}${path.split("/rsvp")[1]}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.getState().login.token.token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      return new ResponseWrapper(
        (errorCode = error.code),
        (errorMessage = error.message)
      );
    });

  return res;
};

export const closeRSVPApi = async (link: string) => {
  const res = await axios.delete(
    `${RSVP_BASE_URL}${RSVP_COMMON_URI}${
      link.split(`${RSVP_HOST}${RSVP_FORM_URI}`)[1]
    }`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.getState().login.token.token}`,
      },
    }
  );

  return res.data;
};

export const getHistoryRSVPApi = async (page) => {
  let error;
  let historyRSVPs: AxiosResponse<GetHistoryRSVPResponse> = await axios
    .get(`${RSVP_BASE_URL}${RSVP_HISTORY_URI}`, {
      params: {
        page: page,
        size: 10,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.getState().login.token.token}`,
      },
    })
    .catch(function (e) {
      let serviceException = e.response.data;
      if (
        serviceException.code === "UNAUTHORIZED" &&
        serviceException.resultCode === "TOKEN_EXPIRED"
      ) {
        error = serviceException.code;
        // logout();
      }
      console.error(serviceException);
    });

  if (error) {
    return error;
  } else {
    return historyRSVPs.data;
  }
};

export const sendRSVPApi = async (path, form) => {
  return await axios
    .post(
      `${RSVP_BASE_URL}${RSVP_RESPONSE_URI}`,
      JSON.stringify(new GuestRSVPRequest(path, form)),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data);
};

const createRSVP = async (form) => {
  const res: AxiosResponse<GetRSVPResponse> = await axios.post(
    `${RSVP_BASE_URL}${RSVP_COMMON_URI}`,
    JSON.stringify(new CreateRSVPRequest(form)),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.getState().login.token.token}`,
      },
    }
  );

  return res.data;
};

export default createRSVP;
