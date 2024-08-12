import { authClientInstance } from "../utils/http-client.js";

export const getBookmarkList = async () => {
  return await authClientInstance
    .get("/api/bookmarks")
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
};

export const deleteBookmark = async bookmarkId => {
  return await authClientInstance
    .delete("/api/bookmarks/" + bookmarkId)
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
};

export const createBookmark = async newNickname => {
  return await authClientInstance
    .post("/api/bookmarks", { nickname: newNickname, clothesIds: [] })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
};

export const patchBookmark = async (bookmarkId, modifiedNickname) => {
  return await authClientInstance
    .patch("api/bookmarks/" + bookmarkId + "/nickname", { nickname: modifiedNickname })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
};

export const getBookmarkDetail = async bookmarkId => {
  return await clientInstance
    .get("api/bookmarks/" + bookmarkId)
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
};

export const deleteClothesInBookmark = async (bookmarkId, clothesId) => {
  return await clientInstance
    .delete("api/bookmarks/" + bookmarkId + "/delete/" + clothesId)
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
};

export const addClothesInBookmark = async (bookmarkId, clothesId) => {
  return await clientInstance
    .post("api/bookmarks/" + bookmarkId + "/delete/" + clothesId)
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
};

export const addBookmark = async () => {
  return await clientInstance
    .post("api/bookmarks/")
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
};
