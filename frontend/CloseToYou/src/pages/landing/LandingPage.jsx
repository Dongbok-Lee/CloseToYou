import { AppTitleText, LandigPageContainer } from "./LandingPageStyle";
import { useNavigate, useLocation } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const accessToken = query.get("accessToken");

  if (accessToken) {
    sessionStorage.setItem("accessToken", accessToken);

    navigate("/closets", { replace: true });
  } else {
    setTimeout(() => {
      navigate("/signin");
    }, 3000);
  }

  return (
    <LandigPageContainer title="Close To You 애플리케이션의 랜딩 화면 입니다.">
      <img src="https://i11b201.p.ssafy.io/assets/logo.svg" />
      <AppTitleText>Close To You</AppTitleText>
    </LandigPageContainer>
  );
};

export default LandingPage;
