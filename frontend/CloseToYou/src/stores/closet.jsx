import { create } from "zustand";

const useStore = create(set => ({
  closetList: [
    {
      closetId: 0,
      nickname: "",
      userId: 0,
      closetCode: "",
      clothesCount: 0,
    },
  ],
  getClosetList: state => state.closetList,
}));
