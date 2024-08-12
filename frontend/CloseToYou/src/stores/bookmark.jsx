import {create} from "zustand";
import {createBookmark, deleteBookmark, getBookmarkList} from "../api/bookmark.js";

const useBookmarkStore = create(set => ({
    bookmarkList: [],
    bookmark: {
        bookmarkId: 0,
        nickname: "",
        userId: 0,
    },
    error: null,
    loading: true,

    loadBookmarkList: async () => {
        const {data, status} = await getBookmarkList();
        if (status === 200) {
            set({bookmarkList: data.data});
            set({loading: false});
        } else {
            set({error: data});
        }
    },

    removeBookmark: async (bookmarkId) => {
        const {data, status} = await deleteBookmark(bookmarkId);
        if (status === 200) {
            set({loading: false})
        } else {
            set({error: data});
        }
    },

    addBookmark: async (nickname) => {
        const {data, status} = await createBookmark(nickname);
        if (status === 200) {
            set({loading: false});
        } else {

            set({error: data});
        }
    }
}));

export default useBookmarkStore;
