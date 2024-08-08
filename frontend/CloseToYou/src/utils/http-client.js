import axios from "axios";

const createClientInstance = () => {
  const instance = axios.create({
    "baseURL": import.meta.env.VITE_REST_API_URL,
    "timeout": 5000,
    "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
    "Access-Control-Allow-Credentials": "true",
  });

  return instance;
};

export const clientInstance = createClientInstance();
