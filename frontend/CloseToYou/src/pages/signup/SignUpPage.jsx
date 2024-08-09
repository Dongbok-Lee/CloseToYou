import { useState } from "react"

import { SignUpPageContainer, SignUpLogoImg, SignUpTitle, SingUpInfoWrapper, SignUpInfoTitle, SignUpInfoNickname, AuthWrapper, AuthCodeWrapper, PasswordWrapper, ErrorText} from "./SignUpPageStyle";

import TextInput from "../../components/textinput/TextInput"
import Button from "../../components/button/Button"

const SignUpPage = () => {
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

  return (
    <SignUpPageContainer className="page">
      <SignUpLogoImg src="src/assets/icons/etc/logo-192x192.svg" alt="Close To You Logo"></SignUpLogoImg>
      <SignUpTitle>Close To You</SignUpTitle>
      <SingUpInfoWrapper>
        <SignUpInfoTitle>회원 가입</SignUpInfoTitle>
        <SignUpInfoNickname className="info-nickname">
          <TextInput textInputPlaceholder={ nicknamePlaceholder } inputValue={ nickname }></TextInput>
          {nickname.length === 0 ? <ErrorText>{ nicknameErrorMessage }</ErrorText> : nickname.length === 8 ? <ErrorText>{ nicknameLengthErrorMessage }</ErrorText> : <span></span>}
        </SignUpInfoNickname>
        <AuthWrapper>
          <TextInput textInputPlaceholder={ emailPlaceholder } inputValue={ email } inputType="email"></TextInput>
          {email.length === 0 ? <ErrorText>{ emailErrorMessage }</ErrorText> : <span></span>}
          <Button>이메일 인증</Button>
          <AuthCodeWrapper>
            <TextInput inputSize="medium" textInputPlaceholder={ authCodePlaceholder } inputValue={ authCode } disabled={ isAuthCode && authCodeLength !== 0 }></TextInput>
            <Button btnSize="small" btnColor="white">확인</Button>
          </AuthCodeWrapper>
          {(!isAuthCode && authCodeLength === 0) ? <ErrorText>{ authCodeErrorMessage }</ErrorText> : <span></span>}
        </AuthWrapper>
        <PasswordWrapper>
          <TextInput textInputPlaceholder={ passwordPlaceholder } inputValue={ password } inputType="password"></TextInput>
          {password.length === 0 ? <ErrorText>{ passwordErrorMessage }</ErrorText> : <span></span>}
          <TextInput textInputPlaceholder={ passwordCheckPlaceholder } inputValue={ passwordCheck}  inputType="password"></TextInput>
          {(passwordCheck === 0 || !isPasswordCorrect) ? <ErrorText>{ passwordCheckErrorMessage }</ErrorText> : <span></span>}
        </PasswordWrapper>
        <Button>회원가입</Button>
    </SingUpInfoWrapper>
    </SignUpPageContainer>
  );
};

export default SignUpPage;
