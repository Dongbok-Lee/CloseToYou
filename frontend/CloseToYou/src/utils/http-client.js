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
  const accessToken = sessionStorage.getItem("accessToken");

  const instance = axios.create({
    baseURL: import.meta.env.VITE_REST_API_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcyMzU3MTE4NiwiZW1haWwiOiJnb2dvdG5hbHNAbmF2ZXIuY29tIiwiaWQiOjF9.yaYE9BMbyPXo4DUt-KzHTtplENNWd-Yn_MNfQddrLv4GKMRQyOs7GgvwVT2bLwktyeHmJ0HkCuv1vZU-dihS2w`,
      "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
      "Access-Control-Allow-Credentials": "true",
    },
    withCredentials: true,
  });

  return instance;
};

const createAuthWithRefreshClientInstance = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = Cookies.get("refreshToken");

  const instance = axios.create({
    baseURL: import.meta.env.VITE_REST_API_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcyMzU0MjI2NywiZW1haWwiOiJkYW55YTZAbmF2ZXIuY29tIiwiaWQiOjE0fQ.8ZE7KiRb_CpZ7QGXQlk1AinnGAeJQNM6i3YeavU4ky-fMXQrlDkeOuzYo52-w6WuO08RUnz07KyyEe5_N8sFNw`,
      "Authorization-refresh": `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MjQ3MTkzNTIsImVtYWlsIjoiZGFueWE2QG5hdmVyLmNvbSIsImlkIjoxNH0.dF1VqEKVZe1Cdwx93VbaL16hcgr4YunGBZOj7KG6cBZcIX5OzNFlgTFw4b52Uc71bHcyBpEgMrEBiLm_Sz922A`,
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
