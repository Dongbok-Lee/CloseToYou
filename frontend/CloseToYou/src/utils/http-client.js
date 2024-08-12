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
      "Authorization": `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcyMzQ1NTM2MywiZW1haWwiOiJkYW55YTZAbmF2ZXIuY29tIiwiaWQiOjE0fQ.Y9KXoLhWYNTQBDT6QpSz8MBNaozDzAnJ4dMfoBO7vgEz1N93SoyjBCKKTwPla1cC6Johx82oqJLOiyiOkmT9hQ`,
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
      "Authorization": `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcyMzQ0OTQzOCwiZW1haWwiOiJkYW55YTZAbmF2ZXIuY29tIiwiaWQiOjE0fQ.bJG2UmLeokJftvhP34ZpiidgDyt425rC8rkmX_cZXeuolNtPzYac8Nv3irzIXQSdEwdN_Ec1tcPlqf53SYkySA`,
      "Authorization-refresh": `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MjQ2NTU0MzgsImVtYWlsIjoiZGFueWE2QG5hdmVyLmNvbSIsImlkIjoxNH0.hoklTeauvIrV1oJ9JessszSFeUbrYsupWrjHbRR1gR2NxSi9a6BSptpzZ6EWs_qDpXoMZj0v8AoOd-6hsfbpJw`,
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
