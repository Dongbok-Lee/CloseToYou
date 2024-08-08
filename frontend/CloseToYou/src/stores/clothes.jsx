import { create } from "zustand";

const useStore = create(set => ({
  clothesList: [],
  clothes: {},
}));
