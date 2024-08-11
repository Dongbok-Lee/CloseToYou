import { create } from "zustand";
import { sendEmail, checkCode } from "../api/email";

export const useEmailStore = create(set => ({
  email: null,
  code: null,
  emailResponse: null,
  codeResponse: null,
  isSucces: false,

  sendEmail: async email => {
    set({ email: email });

    await sendEmail(email)
      .then(response => {
        set({ emailResponse: response.message });
      })
      .catch(error => {
        if (error.response.status === 400) {
          if (email) {
            set({ emailResponse: error.response.data.errors[0].message });
          } else {
            set({ emailResponse: error.response.data.errors[1].message });
          }
        } else {
          // todo: 서버에러 시 처리
        }
      });
  },

  setEmailResponse: newEmailResponse => set({ emailResponse: newEmailResponse }),

  checkCode: async (email, code) => {
    set({ code: code });

    const result = await checkCode(email, code)
      .then(response => {
        set({ codeResponse: response.message, isSucces: true });
      })
      .catch(error => {
        if (error.response.status === 401) {
          set({ codeResponse: error.response.data.message });
        } else {
          // todo: 서버에러 시 처리
        }
        console.log(error);
      });
  },

  setCodeResponse: newCodeResponse => set({ codeResponse: newCodeResponse }),
}));
