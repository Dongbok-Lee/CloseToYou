import { create } from "zustand";
import { sendEmail } from "../api/email";

export const useEmailStore = create(set => ({
  email: null,
  authCode: null,
  emailResponse: null,

  sendEmail: async email => {
    set({ email: email });

    const result = await sendEmail(email)
      .then(response => {
        set({ emailResponse: response.message });
        console.log(response.message);
      })
      .catch(error => {
        if (error.response.status === 400) {
          set({ emailResponse: error.response.data.errors[0].message });
          console.log(error.response.data.errors[0].message);
        } else {
          // todo: 서버에러 시 처리
        }
      });
  },

  setEmailResponse: newEmailResponse => set({ emailResponse: newEmailResponse }),
}));
