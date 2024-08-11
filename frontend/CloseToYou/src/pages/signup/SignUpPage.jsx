import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  SignUpPageContainer,
  SignUpLogoImg,
  SignUpTitle,
  SingUpInfoWrapper,
  SignUpInfoTitle,
  SignUpInfoNickname,
  AuthWrapper,
  AuthCodeWrapper,
  PasswordWrapper,
  SignUpBox,
  ErrorText,
} from "./SignUpPageStyle";

import { placeholder } from "../../constants/placeholder";
import { error } from "../../constants/error";

import TextInput from "../../components/textinput/TextInput";
import Button from "../../components/button/Button";

import { useEmailStore } from "../../stores/email";
import { useUserStore } from "../../stores/user";

const SignUpPage = () => {
  const nav = useNavigate();

  const {
    sendEmail,
    checkCode,
    isSucces,
    emailResponse,
    setEmailResponse,
    codeResponse,
    setCodeResponse,
  } = useEmailStore();

  const { addUser, nicknameResponse, passwordResponse, setNicknameResponse, setPasswordResponse } =
    useUserStore();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);

  const handleTouchSignUpButton = e => {
    e.target.focus();

    setTimeout(() => {
      addUser(nickname, email, password);
    }, 100);

    if (!isPasswordCorrect) {
      setIsPasswordCorrect(false);
    }

    if (passwordCheck !== "" && isPasswordCorrect && isSucces) {
      alert("회원 가입이 완료되었습니다.");
      nav("/signin", { replace: true });
    }

    if (!isSucces) {
      alert("이메일 인증을 해주세요.");
    }
  };

  const handleChangeNickname = e => {
    const newNickname = e.target.value;

    const newLength = newNickname.length;

    if (newLength <= 8) {
      setNickname(newNickname);
    }
    setNicknameResponse("");
  };

  const handleChangeEmail = e => {
    const newEmail = e.target.value;

    setEmail(newEmail);

    setEmailResponse("");
  };

  const handleChangeAuthCode = e => {
    const newAuthCode = e.target.value;

    setAuthCode(newAuthCode);

    setCodeResponse("");
  };

  const handleTouchEailAuthButton = e => {
    e.target.focus();

    setTimeout(() => {
      sendEmail(email);
    }, 100);
  };

  const handleTouchAuthCheckButton = e => {
    e.target.focus();

    setTimeout(() => {
      checkCode(email, authCode);
    });
  };

  const handleChangePassword = e => {
    const newPassword = e.target.value;

    setPassword(newPassword);
    setPasswordResponse("");
  };

  const handleChangePasswordCheck = e => {
    const newPasswordCheck = e.target.value;

    setPasswordCheck(newPasswordCheck);

    if (password !== e.target.value) {
      setIsPasswordCorrect(false);
    } else {
      setIsPasswordCorrect(true);
    }
  };

  return (
    <SignUpPageContainer className="page">
      <SignUpLogoImg
        src="src/assets/icons/etc/logo-192x192.svg"
        alt="Close To You Logo"
      ></SignUpLogoImg>
      <SignUpTitle>Close To You</SignUpTitle>
      <SingUpInfoWrapper>
        <SignUpInfoTitle>회원 가입</SignUpInfoTitle>
        <SignUpInfoNickname>
          <TextInput
            textInputPlaceholder={placeholder.nickname}
            textInputValue={nickname}
            handleChangeTextInput={handleChangeNickname}
            textInputType="text"
          ></TextInput>
          {nicknameResponse ? (
            <ErrorText>{nicknameResponse}</ErrorText>
          ) : nickname.length === 8 ? (
            <ErrorText>{error.nicknameLengthError}</ErrorText>
          ) : (
            <span></span>
          )}
        </SignUpInfoNickname>
        <AuthWrapper>
          <TextInput
            textInputPlaceholder={placeholder.email}
            textInputValue={email}
            handleChangeTextInput={handleChangeEmail}
            textInputType="email"
          ></TextInput>
          {emailResponse ? <ErrorText>{emailResponse}</ErrorText> : <span></span>}
          <Button handleTouchButton={handleTouchEailAuthButton}>이메일 인증</Button>
          <AuthCodeWrapper>
            <TextInput
              textInputPlaceholder={placeholder.authCode}
              textInputValue={authCode}
              handleChangeTextInput={handleChangeAuthCode}
              textInputType="number"
            ></TextInput>
            <Button btnSize="small" btnColor="white" handleTouchButton={handleTouchAuthCheckButton}>
              확인
            </Button>
          </AuthCodeWrapper>
          {codeResponse ? <ErrorText>{codeResponse}</ErrorText> : <span></span>}
        </AuthWrapper>
        <PasswordWrapper>
          <TextInput
            textInputPlaceholder={placeholder.password}
            textInputValue={password}
            textInputType="password"
            handleChangeTextInput={handleChangePassword}
          ></TextInput>
          {passwordResponse ? <ErrorText>{passwordResponse}</ErrorText> : <span></span>}
          <TextInput
            textInputPlaceholder={placeholder.passwordCheck}
            textInputValue={passwordCheck}
            textInputType="password"
            handleChangeTextInput={handleChangePasswordCheck}
          ></TextInput>
          {!isPasswordCorrect ? <ErrorText>{error.passwordCheckError}</ErrorText> : <span></span>}
        </PasswordWrapper>
        <SignUpBox>
          <Button handleTouchButton={handleTouchSignUpButton}>회원가입</Button>
        </SignUpBox>
      </SingUpInfoWrapper>
    </SignUpPageContainer>
  );
};

export default SignUpPage;
