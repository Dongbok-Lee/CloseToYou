import { create } from "zustand";
import { getBookmarkList } from "../api/bookmark.js";

const useBookmarkStore = create(set => ({
  bookmarkList: [],
  bookmark: {
    bookmarkId: 0,
    nickname: "",
    userId: 0,
  },
  error: null,
  loading: false,

  loadBookmarkList: async () => {
    const { data, status } = await getBookmarkList();
    if (status === 200) {
      set({ bookmarkList: data.data });
      set({ loading: true });
    } else {
      set({ error: data });
    }
  },
}));

export default useBookmarkStore;
