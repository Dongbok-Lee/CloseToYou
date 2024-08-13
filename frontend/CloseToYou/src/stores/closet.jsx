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
        console.log(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  },

  addClosets: async (nickname, closetCode) => {
    set({ nickname: nickname, closetCode: closetCode });

    await createClosets(nickname, closetCode)
      .then(async response => {
        await get().loadClosets();
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  },

  removeClosets: async closetId => {
    set({ closetId: closetId });

    await deleteClosets(closetId)
      .then(async response => {
        await get().loadClosets();
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  },

  editClosets: async (closetId, nickname) => {
    set({ closetId: closetId, nickname: nickname });

    await patchClosets(closetId, nickname)
      .then(async response => {
        await get().loadClosets();
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  },
}));
