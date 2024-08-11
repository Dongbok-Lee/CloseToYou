import { create } from "zustand";
import { createUser } from "../api/user";

export const useUserStore = create(set => ({
  nickname: null,
  email: null,
  password: null,
  nicknameResponse: null,
  passwordResponse: null,
  signUpResponse: null,

  addUser: async (nickname, email, password) => {
    set({ nickname: nickname, email: email, password: password });

    await createUser(nickname, email, password)
      .then(response => {
        if (response.status === 200) {
          set({ signUpResponse: response.data.message });
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          const errors = error.response.data.errors;
          errors.forEach(item => {
            if (item.field === "nickname") {
              set({ nicknameResponse: item.message });
            }

            if (item.field === "password") {
              set({ passwordResponse: item.message });
            }
          });
        }
      });
  },
  setNicknameResponse: newNicknameResponse => set({ nicknameResponse: newNicknameResponse }),
  setPasswordResponse: newPasswordResponse => set({ passwordResponse: newPasswordResponse }),
}));
