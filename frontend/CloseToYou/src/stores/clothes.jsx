import { create } from "zustand";
import {
  getClothes,
  deleteClothes,
  patchClothes,
  getSearchedClothes,
  getClothesByNfc,
} from "../api/clothes";

export const useClothesStore = create(set => ({
  clothesList: [],
  selectedClothes: null,

  loadClothesList: async () => {
    console.log("옷 목록을 불러오는 중..."); // 요청 전 콘솔 로그
    const { data, status } = await getClothes();
    console.log("API 응답 상태:", status); // 응답 상태 콘솔 로그
    console.log("받아온 데이터:", data); // 받아온 데이터 콘솔 로그
    if (status === 200) {
      set({ clothesList: data.data });
      console.log("상태 업데이트 완료:", data); // 상태 업데이트 후 콘솔 로그
    }
  },

  removeClothesItem: async clothesId => {
    const { status } = await deleteClothes(clothesId);
    if (status === 204) {
      set(state => ({
        clothesList: state.clothesList.filter(clothes => clothes.id !== clothesId),
      }));
    }
  },

  editClothesItem: async (clothesId, clothesData) => {
    const { data, status } = await patchClothes(clothesId, clothesData);
    if (status === 200) {
      set(state => ({
        clothesList: state.clothesList.map(clothes => (clothes.id === clothesId ? data : clothes)),
      }));
    }
  },

  searchClothesByKeyword: async keyword => {
    const { data, status } = await getSearchedClothes(keyword);
    if (status === 200) {
      set({ clothesList: data.data });
    }
  },

  loadClothesByNfc: async nfcId => {
    const { data, status } = await getClothesByNfc(nfcId);
    if (status === 200) {
      set({ selectedClothes: data });
    }
  },

  selectClothesItem: clothes => {
    set({ selectedClothes: clothes });
  },
}));

export default useClothesStore;
