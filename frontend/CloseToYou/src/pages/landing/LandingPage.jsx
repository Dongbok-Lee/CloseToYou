import { AppTitleText, LandigPageContainer } from "./LandingPageStyle";
import Logo from "../../assets/logo.svg?react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const LandingPage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const accessToken = query.get("accessToken");

  useEffect(() => {
    if (accessToken) {
      sessionStorage.setItem("accessToken", accessToken);
      navigate("/closets", { replace: true });
    } else {
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    }
  }, []);

  return (
    <LandigPageContainer title="Close To You 애플리케이션의 랜딩 화면 입니다.">
      <Logo />
      <AppTitleText>Close To You</AppTitleText>
    </LandigPageContainer>
  );
};

export default LandingPage;
