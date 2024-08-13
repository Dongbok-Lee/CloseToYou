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
    const { data, status } = await getClothes();
    if (status === 200) {
      set({ clothesList: data.data });
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
