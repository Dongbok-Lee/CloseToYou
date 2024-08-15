import { authClientInstance, clientInstance } from "../utils/http-client";

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

export const getUserInfo = async () => {
  return await authClientInstance
    .get("/api/users")
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
};

export const patchHighContrast = async value => {
  return await authClientInstance
    .patch("/api/users/highcontrast/" + value)
    .then(res => {
      return res;
    })
    .then(error => {
      return error;
    });
};

export const patchNickname = async nickname => {
  return await authClientInstance
    .patch("api/users/nickname", {
      nickname: nickname,
    })
    .then(res => {
      return res;
    })
    .catch(e => {
      return e;
    });
};

export const patchPassword = async (oldPassword, newPassword) => {
  return await authClientInstance
    .patch("api/users/password", {
      oldPassword: oldPassword,
      newPassword: newPassword,
    })
    .then(res => {
      return res;
    })
    .catch(e => {
      return e;
    });
};
