import {
  PointText,
  SubText,
  TextInputWrapper,
  TextWrapper,
  TitleText,
  UserEditPageContainer,
} from "./UserEditPageStyle.js";
import TextInput from "../../../components/textinput/TextInput.jsx";
import Button from "../../../components/button/Button.jsx";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NICKNAME_OVERLAP_MESSAGE = "이전과 동일한 닉네임 입니다.";
const NICKNAME_LENGTH_MESSAGE = "닉네임은 1자 이상, 8자 이하로 입력해 주세요.";
const NICKNAME_EMPTY_MESSAGE = "닉네임을 입력해 주세요!";
const PASSWORD_LENGTH_MESSAGE = "비밀번호는 8자 이상, 15자 이하로  입력해 주세요.";
// const PASSWORD_MISMATCH_MESSAGE = "비밀번호가 맞지 않습니다.";
const PASSWORD_EMPTY_MESSAGE = "비밀번호를 입력해 주세요!";

const user = {
  email: "chano@gmail.com",
  nickname: "기가차노",
  registTime: "",
  updateTime: "",
  isHighContrast: false,
};

const UserEditPage = ({ type }) => {
  const [text, setText] = useState("");
  const [checkText, setCheckText] = useState("");
  const [valText, setValText] = useState("");
  // TODO: 커스텀 훅 만들어서 사용할 예정 (hooks/useIsFocused.jsx)
  const [isFocused, setIsFocused] = useState(false);

  const navigate = useNavigate();

  const validation = useCallback(() => {
    let message = "";

    if (type === "nickname") {
      if (text === user.nickname) message = NICKNAME_OVERLAP_MESSAGE;
      else if (text.length < 1 || text.length > 8) message = NICKNAME_LENGTH_MESSAGE;
    }

    if (type === "password") {
      if (text.length < 8 || text.length > 15) message = PASSWORD_LENGTH_MESSAGE;
      // else if (text !== checkText) message = PASSWORD_MISMATCH_MESSAGE;
    }

    setValText(message);
  }, [type, text, checkText]);

  const handleChangeTextInput = e => {
    setText(e.target.value);
    setIsFocused(true);
  };

  const handleChangeCheckInput = e => {
    setCheckText(e.target.value);
  };

  useEffect(() => {
    isFocused&& validation();
  }, [text, checkText, validation]);

  const handleClickButton = () => {
    // TODO: 변경 API 호출
    console.log("변경된 텍스트: ", text);

    if (text.length === 0) {
      setValText(type === "nickname" ? NICKNAME_EMPTY_MESSAGE : PASSWORD_EMPTY_MESSAGE);
    } else if (!valText) {
      navigate("/user");
    }
  };

  return (
    <UserEditPageContainer className="page">
      <TextWrapper>
        {type === "nickname" ? (
          <>
            <TitleText>새로운 닉네임을 입력해주세요.</TitleText>
            <SubText>
              현재 등록된 닉네임은 <PointText>{user.nickname}</PointText>에요.
            </SubText>
          </>
        ) : (
          <TitleText>새 비밀번호를 입력해주세요.</TitleText>
        )}
      </TextWrapper>

      {type === "nickname" ? (
        <>
          <TextInputWrapper>
            <TextInput
              textInputPlaceholder="닉네임을 입력해 주세요."
              handleChangeTextInput={handleChangeTextInput}
              handleTouchEnd={() => {
                setValText("");
              }}
            />
            <SubText>{valText}</SubText>
          </TextInputWrapper>
        </>
      ) : (
        <TextInputWrapper>
          <TextInput
            textInputPlaceholder="비밀번호를 입력해 주세요."
            handleChangeTextInput={handleChangeTextInput}
            handleTouchEnd={() => {
              setValText("");
            }}
            type="password"
          />
          <SubText>{valText}</SubText>
          <TextInput
            textInputPlaceholder="비밀번호 확인"
            handleChangeTextInput={handleChangeCheckInput}
            type="password"
          />
        </TextInputWrapper>
      )}

      <Button children="완료" onClick={handleClickButton} />
    </UserEditPageContainer>
  );
};

export default UserEditPage;
