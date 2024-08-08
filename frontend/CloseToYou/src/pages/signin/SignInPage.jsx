import { useState } from "react";
import {
  SignInPageContainer,
  SignInTitle,
  SignInLogoImg,
  UserInfoInputWrapper,
  ErrorText,
  SignInUpButtonWrapper,
  SNSButtonWrapper,
} from "./SignInPageStyle";

import TextInput from "../../components/textinput/TextInput";
import Button from "../../components/button/Button";
import SocialButton from "../../components/socialbutton/SocialButton";

const SignInPage = () => {
  const emailPlaceholder = "이메일을 입력해주세요.";
  const passwordPlaceholder = "비밀번호를 입력해주세요.";
  const infoErrorMessage = "이메일과 비밀번호를 확인해주세요.";

  const [isInfoError, setIsInfoError] = useState(false);

  return (
  <SignInPageContainer className="page">
    <SignInTitle tabIndex={0}>Close To You</SignInTitle>
      <SignInLogoImg
        src="src/assets/icons/etc/logo-192x192.svg"
        alt="Close To You Logo"
      ></SignInLogoImg>
      <UserInfoInputWrapper>
        <TextInput textInputPlaceholder={emailPlaceholder} textInputType="email"></TextInput>
        <TextInput textInputPlaceholder={passwordPlaceholder} textInputType="password"></TextInput>
        {isInfoError ? <ErrorText>{infoErrorMessage}</ErrorText> : <span></span>}
      </UserInfoInputWrapper>
      <SignInUpButtonWrapper>
        <Button>로그인</Button>
        <Button btnColor="white">회원가입</Button>
      </SignInUpButtonWrapper>
      <SNSButtonWrapper>
        <SocialButton socialBtnType="kakao"></SocialButton>
        <SocialButton socialBtnType="google"></SocialButton>
      </SNSButtonWrapper>
  </SignInPageContainer>)
  ;
};

export default SignInPage;
