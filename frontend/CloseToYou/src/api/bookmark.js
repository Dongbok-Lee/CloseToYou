import { authClientInstance } from "../utils/http-client.js";

export const getBookmarkList = async () => {
  return await authClientInstance
    .get("/api/bookmarks", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
};

export const deleteBookmark = async bookmarkId => {
  return await authClientInstance
    .delete("/api/bookmarks/" + bookmarkId, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
};

export const createBookmark = async newNickname => {
  return await authClientInstance
    .post(
      "/api/bookmarks",
      { nickname: newNickname },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      },
    )
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
};

export const patchBookmark = async (bookmarkId, modifiedNickname) => {
  return await authClientInstance
    .patch(
      "api/bookmarks/" + bookmarkId + "/nickname",
      { nickname: modifiedNickname },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      },
    )
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
};

export const getBookmarkDetail = async bookmarkId => {
  return await authClientInstance
    .get("api/bookmarks/" + bookmarkId, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
};

export const deleteClothesInBookmark = async (bookmarkId, clothesId) => {
  return await authClientInstance
    .delete("api/bookmarks/" + bookmarkId + "/delete/" + clothesId, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
};

export const createClothesInBookmark = async (bookmarkId, clothesId) => {
  return await authClientInstance
    .post("api/bookmarks/" + bookmarkId + "/add/" + clothesId, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
};
