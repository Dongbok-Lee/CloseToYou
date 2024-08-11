import axios from "axios";
import Cookies from "js-cookie";

const createClientInstance = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_REST_API_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
      "Access-Control-Allow-Credentials": "true",
    },
    withCredentials: true,
  });

  return instance;
};

const createAuthClientInstance = () => {
  const accessToken = Cookies.get("access_token");

  const instance = axios.create({
    baseURL: import.meta.env.VITE_REST_API_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
      "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
      "Access-Control-Allow-Credentials": "true",
    },
    withCredentials: true,
  });

  return instance;
};

const createAuthWithRefreshClientInstance = () => {
  const accessToken = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");

  const instance = axios.create({
    baseURL: import.meta.env.VITE_REST_API_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
      "Authorization-refresh": `Bearer ${refreshToken}`,
      "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
      "Access-Control-Allow-Credentials": "true",
    },
    withCredentials: true,
  });

  return instance;
};

export const clientInstance = createClientInstance();
export const authClientInstance = createAuthClientInstance();
export const authWithRefreshClientInstance = createAuthWithRefreshClientInstance();
