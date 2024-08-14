import { clientInstance } from "../utils/http-client";

export const sendEmail = async email => {
  const response = await clientInstance.post("api/email/authentication/send", { email: email });
  return response.data;
};

export const checkCode = async (email, code) => {
  const response = await clientInstance.post("api/email/authentication/check", {
    email: email,
    code: code,
  });
  return response.data;
};
