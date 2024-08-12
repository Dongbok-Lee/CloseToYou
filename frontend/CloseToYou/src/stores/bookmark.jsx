import { create } from "zustand";
import {
  createBookmark,
  deleteBookmark,
  deleteClothesInBookmark,
  getBookmarkDetail,
  getBookmarkList,
  patchBookmark,
} from "../api/bookmark.js";

const useBookmarkStore = create(set => ({
  bookmarkList: [],
  bookmark: {
    bookmarkId: 0,
    nickname: "",
    clothes: [
      {
        clothesId: 0,
        nickname: "",
        color: "",
        type: "",
      },
    ],
  },
  error: null,
  loading: true,

  loadBookmarkList: async () => {
    const { data, status } = await getBookmarkList();
    if (status === 200) {
      set({ bookmarkList: data.data });
      set({ loading: false });
    } else {
      set({ error: data });
    }
  },

  removeBookmark: async bookmarkId => {
    const { data, status } = await deleteBookmark(bookmarkId);
    if (status === 200) {
      set({ loading: false });
    } else {
      set({ error: data });
    }
  },

  addBookmark: async newNickname => {
    const { data, status } = await createBookmark(newNickname);
    if (status === 200) {
      set({ loading: false });
    } else {
      set({ error: data });
    }
  },

  editBookmark: async (bookmarkId, modifiedNickname) => {
    const { data, status } = await patchBookmark(bookmarkId, modifiedNickname);
    if (status === 200) {
      set({ loading: false });
    } else {
      set({ error: data });
    }
  },

  loadBookmarkDetail: async bookmarkId => {
    const { data, status } = await getBookmarkDetail(bookmarkId);
    if (status === 200) {
      set({ loading: false });
      set({ bookmark: data.data });
    } else {
      set({ error: data });
    }
  },

  removeClothesInBookmark: async (bookmarkId, clothesId) => {
    const { data, status } = await deleteClothesInBookmark(bookmarkId, clothesId);
    if (status === 200) {
      set({ loading: false });
    } else {
      set({ error: data });
    }
  },
}));

export default useBookmarkStore;
