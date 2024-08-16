import { authClientInstance, authWithRefreshClientInstance } from "../utils/http-client";

export const getClosets = async () => {
  const response = await authClientInstance.get("api/closets", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });

  return response;
};

export const createClosets = async (nickname, closetCode) => {
  const response = await authClientInstance.post(
    "api/closets",
    {
      nickname: nickname,
      closetCode: closetCode,
    },

    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    },
  );

  return response;
};

export const deleteClosets = async closetId => {
  const response = await authClientInstance.delete(`api/closets/${closetId}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });

  return response;
};

export const patchClosets = async (closetId, nickname) => {
  const response = await authClientInstance.patch(
    `api/closets/${closetId}`,
    {
      nickname: nickname,
    },
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    },
  );

  return response;
};
