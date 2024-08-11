import { AppTitleText, LandigPageContainer } from "./LandingPageStyle";
import Logo from "../../assets/logo.svg?react";
import {useNavigate} from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();

    setTimeout(() => {
        // TODO: 로그인 여부 확인해서 로그인 화면 또는 옷장 고르는 화면으로 이동
        navigate('/signin');
    }, 3000)
  return (
    <LandigPageContainer title="Close To You 애플리케이션의 랜딩 화면 입니다.">
      <Logo />
      <AppTitleText>Close To You</AppTitleText>
    </LandigPageContainer>
  );
};

export default LandingPage;
