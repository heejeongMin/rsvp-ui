import { CreateRSVPRequest } from "../models/req/CreateRSVPRequest.ts";
import axios, { AxiosResponse } from "axios";
import store from "../redux/Store.ts";
import { GetActiveRSVPResponse } from "../models/res/GetActiveRSVPResponse";
import { GetHistoryRSVPResponse } from "../models/res/GetHistoryRSVPResponse";

const RSVP_BASE_URL = process.env.REACT_APP_RSVP_BASE_URL;
const RSVP_COMMON_URI = process.env.REACT_APP_RSVP_COMMON_URI;
const RSVP_HISTORY_URI = process.env.REACT_APP_RSVP_HISTORY_URI;

const createRSVP = async (form) => {
  await axios.post(
    `${RSVP_BASE_URL}${RSVP_COMMON_URI}`,
    JSON.stringify(new CreateRSVPRequest(form)),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.getState().login.token.token}`,
      },
    }
  );
};

export const getActiveRSVPApi = async () => {
  let activeRSVPs: AxiosResponse<GetActiveRSVPResponse> = await axios.get(
    `${RSVP_BASE_URL}${RSVP_COMMON_URI}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.getState().login.token.token}`,
      },
    }
  );

  return activeRSVPs.data;
};

export const closeRSVPApi = async (link: string) => {
  const res = await axios.put(
    `${RSVP_BASE_URL}${RSVP_COMMON_URI}${
      link.split(`${RSVP_BASE_URL}${RSVP_COMMON_URI}`)[1]
    }`,
    null,
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
  let historyRSVPs: AxiosResponse<GetHistoryRSVPResponse> = await axios.get(
    `${RSVP_BASE_URL}${RSVP_HISTORY_URI}`,
    {
      params: {
        page: page,
        size: 10,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.getState().login.token.token}`,
      },
    }
  );

  return historyRSVPs.data;
};

export default createRSVP;
