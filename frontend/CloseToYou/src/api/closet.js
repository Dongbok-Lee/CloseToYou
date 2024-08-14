import { authClientInstance, authWithRefreshClientInstance } from "../utils/http-client";

export const getClosets = async () => {
  const response = await authClientInstance.get("api/closets");

  return response;
};

export const createClosets = async (nickname, closetCode) => {
  const response = await authClientInstance.post("api/closets", {
    nickname: nickname,
    closetCode: closetCode,
  });

  return response;
};

export const deleteClosets = async closetId => {
  const response = await authClientInstance.delete(`api/closets/${closetId}`);

  return response;
};

export const patchClosets = async (closetId, nickname) => {
  const response = await authClientInstance.patch(`api/closets/${closetId}`, {
    nickname: nickname,
  });

  return response;
};
