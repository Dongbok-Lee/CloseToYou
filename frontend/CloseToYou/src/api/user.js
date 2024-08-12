import { clientInstance } from "../utils/http-client";

export const createUser = async (nickname, email, password) => {
  const response = await clientInstance.post("api/users/join", {
    nickname: nickname,
    email: email,
    password: password,
  });

  return response;
};

export const createSignIn = async (email, password) => {
  const response = await clientInstance.post("api/users/login", {
    email: email,
    password: password,
  });

  return response;
};
