import { create } from "zustand";
import {
  getClothes,
  getClothesById,
  deleteClothes,
  patchClothes,
  getSearchedClothes,
  getClothesByNfc,
} from "../api/clothes";

export const useClothesStore = create(set => ({
  clothesList: [],
  selectedClothes: null,
  clothes: [],

  loadClothesList: async () => {
    const { data, status } = await getClothes();
    if (status === 200) {
      console.log("data111", data.data);
      set({ clothes: data.data });
    }
  },
  loadClothesDetail: async id => {
    const { data, status } = await getClothesById(id);
    if (status === 200) {
      console.log("data", data.data);
      set({ clothes: data.data });
    }
  },
  removeClothesItem: async clothesId => {
    const { status } = await deleteClothes(clothesId);
    if (status === 204) {
      set(state => ({
        clothes: state.clothes.filter(clothes => clothes.clothesId !== clothesId),
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
    console.log("API response data:", data); // 응답 구조 확인을 위한 로그
    if (status === 200) {
      set({ selectedClothes: data });
      return data.id;
    } else {
      throw new Error("옷을 찾을 수 없습니다.");
    }
  },

  selectClothesItem: clothes => {
    set({ selectedClothes: clothes });
  },
}));

export default useClothesStore;
