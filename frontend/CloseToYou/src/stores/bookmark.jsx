import { create } from "zustand";
import { getBookmarkDetail } from "../api/bookmark.js";

const useStore = create(set => ({
  bookMarkList: [],
  bookmark: {
    bookmarkId: 0,
    nickname: "",
    userId: 0,
  },
  getBookMarkList: () => {},
  getBookMark: () =>
    set(async state => {
      const { data } = await getBookmarkDetail();
      state.bookmark = data;
    }),
}));
