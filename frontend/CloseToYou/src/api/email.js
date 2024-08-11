import { clientInstance } from "../utils/http-client";

export const sendEmail = async email => {
  const response = await clientInstance.post("api/email/authentication/send", { email: email });
  return response.data;
};
