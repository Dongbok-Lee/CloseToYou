import { create } from "zustand";
import { createUser, createSignIn } from "../api/user";
import { setAccessToken, removeAccessToken } from "../utils/token";

export const useUserStore = create(set => ({
  nickname: "",
  email: "",
  password: "",
  nicknameResponse: "",
  passwordResponse: "",
  signUpResponse: "",
  signInResponse: "",
  isSuccess: false,

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

  addSignIn: async (email, password) => {
    set({ email: email, password: password });

    await createSignIn(email, password)
      .then(response => {
        if (response.status === 200) {
          setAccessToken();
          removeAccessToken();
          set({ signInResponse: response.data.message, isSuccess: true });
        }
        
      })
      .catch(error => {
        if (error.response.status === 400) {
          set({ signInResponse: error.response.data.message });
        } else {
          // todo: 서버 에러 시 처리
        }
      });
  },

  setNicknameResponse: newNicknameResponse => set({ nicknameResponse: newNicknameResponse }),
  setPasswordResponse: newPasswordResponse => set({ passwordResponse: newPasswordResponse }),
  setSignInResponse: newSignInResponse => set({ signInResponse: newSignInResponse }),
}));
