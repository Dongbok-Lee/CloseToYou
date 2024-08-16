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
import { useUserStore } from "../../../stores/user.jsx";

const NICKNAME_OVERLAP_MESSAGE = "이전과 동일한 닉네임 입니다.";
const NICKNAME_LENGTH_MESSAGE = "닉네임은 1자 이상, 8자 이하로 입력해 주세요.";
const NICKNAME_EMPTY_MESSAGE = "닉네임을 입력해 주세요!";
const PASSWORD_LENGTH_MESSAGE = "비밀번호는 8자 이상, 15자 이하로  입력해 주세요.";
const PASSWORD_NOT_CHANGE_MESSAGE = "기존 비밀 번호와 동일한 비밀 번호 입니다.";
const PASSWORD_EMPTY_MESSAGE = "비밀번호를 입력해 주세요!";

const UserEditPage = ({ type }) => {
  const [oldText, setOldText] = useState("");
  const [text, setText] = useState("");
  const [checkText, setCheckText] = useState("");
  const [valText, setValText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const navigate = useNavigate();
  const { nickname, editNickname, editPassword } = useUserStore();

  const validation = useCallback(() => {
    let message = "";

    if (type === "nickname") {
      if (text === nickname) message = NICKNAME_OVERLAP_MESSAGE;
      else if (text.length < 1 || text.length > 8) message = NICKNAME_LENGTH_MESSAGE;
    }

    if (type === "password") {
      if (text.length < 8 || text.length > 15) message = PASSWORD_LENGTH_MESSAGE;
      else if (text === oldText) message = PASSWORD_NOT_CHANGE_MESSAGE;
    }

    setValText(message);
  }, [type, text, checkText]);

  const handleChangeTextInput = e => {
    setText(e.target.value);
    setIsFocused(true);
  };

  useEffect(() => {
    isFocused && validation();
  }, [text, checkText, validation]);

  const handleTouchButton = () => {
    if (text.length === 0) {
      setValText(type === "nickname" ? NICKNAME_EMPTY_MESSAGE : PASSWORD_EMPTY_MESSAGE);
    } else if (!valText) {
      if (type === "nickname") editNickname(text);
      else editPassword(oldText, text);

      setTimeout(() => {
        navigate("/user");
      }, 2000);
    }
  };

  return (
    <UserEditPageContainer className="page">
      <TextWrapper>
        {type === "nickname" ? (
          <>
            <TitleText>새로운 닉네임을 입력해주세요.</TitleText>
            <SubText>
              현재 등록된 닉네임은 <PointText>{nickname}</PointText>에요.
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
            textInputType="password"
            textInputPlaceholder="기존 비밀 번호"
            handleChangeTextInput={e => setOldText(e.target.value)}
            handleTouchEnd={() => {
              setValText("");
            }}
            type="password"
          />
          <TextInput
            textInputType="password"
            textInputPlaceholder="새로운 비밀 번호"
            handleChangeTextInput={handleChangeTextInput}
            handleTouchEnd={() => {
              setValText("");
            }}
            type="password"
          />
          <SubText>{valText}</SubText>
          <TextInput
            textInputType="password"
            textInputPlaceholder="비밀번호 확인"
            handleChangeTextInput={e => setCheckText(e.target.value)}
            type="password"
          />
        </TextInputWrapper>
      )}

      <Button children="완료" handleTouchButton={handleTouchButton} />
    </UserEditPageContainer>
  );
};

export default UserEditPage;
