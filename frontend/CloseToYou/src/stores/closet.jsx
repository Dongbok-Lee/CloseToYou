import { create } from "zustand";
import { getClosets, createClosets, deleteClosets, patchClosets } from "../api/closet";

export const useClosetsStore = create((set, get) => ({
  closetId: "",
  nickname: "",
  closetCode: "",
  clothesCount: 0,
  closets: [],

  loadClosets: async () => {
    await getClosets()
      .then(response => {
        set({ closets: response.data.data });
      })
      .catch(error => {
        // todo: 서버 에러 처리
      });
  },

  addClosets: async (nickname, closetCode) => {
    set({ nickname: nickname, closetCode: closetCode });

    await createClosets(nickname, closetCode)
      .then(async response => {
        await get().loadClosets();
      })
      .catch(error => {
        // todo: 서버 에러 처리
      });
  },

  removeClosets: async closetId => {
    set({ closetId: closetId });

    await deleteClosets(closetId)
      .then(async response => {
        await get().loadClosets();
      })
      .catch(error => {
        // todo: 서버 에러 처리
      });
  },

  editClosets: async (closetId, nickname) => {
    set({ closetId: closetId, nickname: nickname });

    await patchClosets(closetId, nickname)
      .then(async response => {
        await get().loadClosets();
      })
      .catch(error => {
        // todo: 서버 에러 처리
      });
  },
}));
