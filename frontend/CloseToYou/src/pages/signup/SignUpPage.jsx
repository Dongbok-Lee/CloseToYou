import { useState } from "react"
import { useNavigate } from "react-router-dom";

import { SignUpPageContainer, SignUpLogoImg, SignUpTitle, SingUpInfoWrapper, SignUpInfoTitle, SignUpInfoNickname, AuthWrapper, AuthCodeWrapper, PasswordWrapper, SignUpBox, ErrorText} from "./SignUpPageStyle";

import TextInput from "../../components/textinput/TextInput"
import Button from "../../components/button/Button"

const SignUpPage = () => {

  const nav = useNavigate();

  const nicknamePlaceholder = "닉네임을 입력해주세요.";
  const emailPlaceholder = "이메일을 입력해주세요.";
  const authCodePlaceholder = "인증번호"
  const passwordPlaceholder = "비밀번호를 입력해주세요.";
  const passwordCheckPlaceholder = "비밀번호를 확인해주세요.";

  const nicknameErrorMessage = "닉네임을 입력해주세요.";
  const emailErrorMessage = "이메일을 입력해주세요.";
  const authCodeErrorMessage = "인증을 진행해주세요."
  const passwordErrorMessage = "비밀번호를 입력해주세요.";
  const passwordCheckErrorMessage = "비밀번호 재확인을 해주세요.";

  const nicknameLengthErrorMessage = "닉네임은 최대 8자까지 입니다."

  const [ nickname, setNickname ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ authCode, setAuthCode ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ passwordCheck, setPasswordCheck ] = useState("");

  const [ isAuthCode, setIsAuthCode ] = useState(false);
  const [ isPasswordCorrect, setIsPasswordCorrect ] = useState(true);

  const [ authCodeLength, setAuthCodeLength ] = useState(0);

  const handleTouchSignUpButton = () => {
    nav("/signin");
  }

  const handleChangeNcikname = (e) => {
    const newNickname = e.target.value;

    const newLength = newNickname.length;

    if (newLength <= 8) {
        setNickname(newNickname);
    }
  }

  const handleChangeEmail = (e) => {
    const newEmail = e.target.value;

    setEmail(newEmail);
  }


  const handleChangeAuthCode = (e) => {
      const newAuthCode = e.target.value;
      const newLength = newAuthCode.length;

      setAuthCode(newAuthCode);
      setAuthCodeLength(newLength);

  }

  const handleChangePassword = (e) => {
      const newPassword = e.target.value;

      setPassword(newPassword);
  }

  const handleChangePasswordCheck = (e) => {
      const newPasswordCheck = e.target.value;

      setPasswordCheck(newPasswordCheck);

      if (password !== e.target.value) {
          setIsPasswordCorrect(false);
      } else {
          setIsPasswordCorrect(true);
      }

  }

  return (
    <SignUpPageContainer className="page">
      <SignUpLogoImg src="src/assets/icons/etc/logo-192x192.svg" alt="Close To You Logo"></SignUpLogoImg>
      <SignUpTitle>Close To You</SignUpTitle>
      <SingUpInfoWrapper>
        <SignUpInfoTitle>회원 가입</SignUpInfoTitle>
        <SignUpInfoNickname>
          <TextInput textInputPlaceholder={ nicknamePlaceholder } textInputValue={ nickname } handleChangeTextInput={ handleChangeNcikname }></TextInput>
          {nickname.length === 0 ? <ErrorText>{ nicknameErrorMessage }</ErrorText> : nickname.length === 8 ? <ErrorText>{ nicknameLengthErrorMessage }</ErrorText> : <span></span>}
        </SignUpInfoNickname>
        <AuthWrapper>
          <TextInput textInputPlaceholder={ emailPlaceholder } textInputValue={ email } handleChangeTextInput={handleChangeEmail} textInputType="email"></TextInput>
          {email.length === 0 ? <ErrorText>{ emailErrorMessage }</ErrorText> : <span></span>}
          <Button>이메일 인증</Button>
          <AuthCodeWrapper>
            <TextInput textInputPlaceholder={ authCodePlaceholder } textInputValue={ authCode } handleChangeTextInput={handleChangeAuthCode}></TextInput>
            <Button btnSize="small" btnColor="white">확인</Button>
          </AuthCodeWrapper>
          {(!isAuthCode && authCodeLength === 0) ? <ErrorText>{ authCodeErrorMessage }</ErrorText> : <span></span>}
        </AuthWrapper>
        <PasswordWrapper>
          <TextInput textInputPlaceholder={ passwordPlaceholder } textInputValue={ password } textInputType="password" handleChangeTextInput={handleChangePassword}></TextInput>
          {password.length === 0 ? <ErrorText>{ passwordErrorMessage }</ErrorText> : <span></span>}
          <TextInput textInputPlaceholder={ passwordCheckPlaceholder } textInputValue={ passwordCheck}  textInputType="password" handleChangeTextInput={handleChangePasswordCheck}></TextInput>
          {(passwordCheck === 0 || !isPasswordCorrect) ? <ErrorText>{ passwordCheckErrorMessage }</ErrorText> : <span></span>}
        </PasswordWrapper>
        <SignUpBox>
          <Button handleTouchButton={handleTouchSignUpButton}>회원가입</Button>
        </SignUpBox>
      </SingUpInfoWrapper>
    </SignUpPageContainer>
  );
};

export default SignUpPage;
