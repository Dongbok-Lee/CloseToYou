import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ErrorText,
  SignInPageContainer,
  SignInTitle,
  SignInUpButtonWrapper,
  SNSButtonWrapper,
  UserInfoInputWrapper,
} from "./SignInPageStyle";

import Logo from "../../assets/icons/etc/signin-logo.svg?react";
import TextInput from "../../components/textinput/TextInput";
import Button from "../../components/button/Button";
import SocialButton from "../../components/socialbutton/SocialButton";

import { placeholder } from "../../constants/placeholder";
import { error } from "../../constants/error";

import { useUserStore } from "../../stores/user";
import Modal from "../../components/modal/Modal.jsx";

const SignInPage = () => {
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);

  const { addSignIn, setSignInResponse, signInResponse, isSuccess } = useUserStore();

  const nav = useNavigate();

  useEffect(() => {
    isSuccess && setIsOpenSuccessModal(true);
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

  const handleTouchKakaoButton = async () => {
    window.location.href = import.meta.env.VITE_KAKAO_LOGIN_URL;
  };

  const handleTouchGoogleButton = async () => {
    window.location.href = import.meta.env.VITE_GOOGLE_LOGIN_URL;
  };

  return (
    <SignInPageContainer className="page">
      {isOpenSuccessModal && (
        <Modal
          modalType="text"
          setIsOpenModal={setIsOpenSuccessModal}
          handleTouchConfirmButton={() => nav("/closets", { replace: true })}
          content="로그인에 성공했습니다."
          children="확인"
        ></Modal>
      )}
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
        <SocialButton
          socialBtnType="kakao"
          handleTouchButton={handleTouchKakaoButton}
        ></SocialButton>
        <SocialButton
          socialBtnType="google"
          handleTouchButton={handleTouchGoogleButton}
        ></SocialButton>
      </SNSButtonWrapper>
    </SignInPageContainer>
  );
};

export default SignInPage;
