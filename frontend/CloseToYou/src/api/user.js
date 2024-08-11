import { clientInstance } from "../utils/http-client";

export const createUser = async (nickname, email, password) => {
  const response = await clientInstance.post("api/users/join", {
    nickname: nickname,
    email: email,
    password: password,
  });

  return response;
};
