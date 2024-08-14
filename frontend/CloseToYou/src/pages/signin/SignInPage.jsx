import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SignInPageContainer,
  SignInTitle,
  UserInfoInputWrapper,
  ErrorText,
  SignInUpButtonWrapper,
  SNSButtonWrapper,
} from "./SignInPageStyle";

import Logo from "../../assets/icons/etc/signin-logo.svg?react";
import TextInput from "../../components/textinput/TextInput";
import Button from "../../components/button/Button";
import SocialButton from "../../components/socialbutton/SocialButton";

import { placeholder } from "../../constants/placeholder";
import { error } from "../../constants/error";

import { useUserStore } from "../../stores/user";

const SignInPage = () => {
  const { addSignIn, setSignInResponse, signInResponse, isSuccess } = useUserStore();

  const nav = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      alert("로그인 되었습니다.");
      nav("/closets", { replace: true });
    }
  }, [isSuccess]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleTouchSignInButton = e => {
    e.target.focus();

    setTimeout(() => {
      addSignIn(email, password);
    }, 100);
  };

  const handleTouchButton = () => {
    nav("/signup");
  };

  const handleChangeEmail = e => {
    setEmail(e.target.value);
    setSignInResponse("");
  };

  const handleChagnePassword = e => {
    setPassword(e.target.value);
    setSignInResponse("");
  };

  return (
    <SignInPageContainer className="page">
      <SignInTitle tabIndex={0}>Close To You</SignInTitle>
      <Logo></Logo>
      <UserInfoInputWrapper>
        <TextInput
          textInputPlaceholder={placeholder.email}
          handleChangeTextInput={handleChangeEmail}
          textInputType="email"
        ></TextInput>
        <TextInput
          textInputPlaceholder={placeholder.password}
          handleChangeTextInput={handleChagnePassword}
          textInputType="password"
        ></TextInput>
        {signInResponse ? <ErrorText>{error.signInError}</ErrorText> : <span></span>}
      </UserInfoInputWrapper>
      <SignInUpButtonWrapper>
        <Button handleTouchButton={handleTouchSignInButton}>로그인</Button>
        <Button btnColor="white" handleTouchButton={handleTouchButton}>
          회원가입
        </Button>
      </SignInUpButtonWrapper>
      <SNSButtonWrapper>
        <SocialButton socialBtnType="kakao"></SocialButton>
        <SocialButton socialBtnType="google"></SocialButton>
      </SNSButtonWrapper>
    </SignInPageContainer>
  );
};

export default SignInPage;
