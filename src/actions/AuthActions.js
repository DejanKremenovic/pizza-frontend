import axios from "axios";
import { BACKEND_URL } from "../config";
import { getFormattedToken } from "../utils";

/*
  Try to login
*/
export const loginUser = (email, password) => {
  const body = JSON.stringify({ email: email, password: password });
  return axios.post(`${BACKEND_URL}login`, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/*
  Logout 
*/
export const LogoutUser = () => {
    return axios.post(`${BACKEND_URL}logout`, {}, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": getFormattedToken()
      },
    });
  };
  