import Cookies from "js-cookie";

export const setAccessToken = () => {
  const accessToken = Cookies.get("accessToken");

  sessionStorage.setItem("accessToken", accessToken);
};

export const removeAccessToken = () => {
  Cookies.remove("accessToken");
};
