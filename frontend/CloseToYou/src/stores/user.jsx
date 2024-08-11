import { create } from "zustand";

const useStore = create(set => ({
  user: { email: "", nickname: "" },
  isHighContrast: false,
}));
