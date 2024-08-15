import {
  ButtonText,
  ChangeWrapper,
  HighContrastWrapper,
  SubText,
  TitleText,
  UserInfoWrapper,
  UserPageContainer,
  WelcomeWrapper,
} from "./UserViewPageStyle.js";
import { useEffect, useState } from "react";
import ToggleButton from "../../../components/togglebutton/ToggleButton.jsx";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../stores/user.jsx";
import { useTheme } from "@emotion/react";

const UserViewPage = () => {
  const [isToggle, setIsToggle] = useState(() => {
    const savedValue = localStorage.getItem("isHighContrast");
    return savedValue !== null ? JSON.parse(savedValue) : false;
  });

  const { nickname, email, loadUserInfo, editHighContrast } = useUserStore();

  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchUserInfo = async () => {
      await loadUserInfo();
      const savedValue = localStorage.getItem("isHighContrast");
      setIsToggle(savedValue !== null ? JSON.parse(savedValue) : false);
    };
    fetchUserInfo();
  }, [loadUserInfo]);

  useEffect(() => {
    editHighContrast(isToggle);
    theme.mode = isToggle;
    localStorage.setItem("isHighContrast", JSON.stringify(isToggle));
  }, [isToggle, editHighContrast]);

  const handleTouchChangeNickname = () => {
    navigate("/nickname");
  };

  const handleTouchChangePassword = () => {
    navigate("/password");
  };

  const handleTouchLogout = e => {
    e.target.focus();
    window.confirm("정말 로그아웃 하세요?🥺");
    navigate("/signin");
  };

  return (
    <UserPageContainer className="page">
      <HighContrastWrapper>
        <span>고대비 모드</span>
        <ToggleButton isOn={isToggle} setIsOn={setIsToggle} />
      </HighContrastWrapper>
      <WelcomeWrapper tabIndex={0} title={`${nickname}님, 안녕하세요.`}>
        <TitleText>{nickname}</TitleText>
        <SubText>님, 안녕하세요!</SubText>
      </WelcomeWrapper>
      <UserInfoWrapper>
        <TitleText tabIndex={0}>이메일</TitleText>
        <SubText tabIndex={0}>{email}</SubText>
      </UserInfoWrapper>
      <UserInfoWrapper>
        <TitleText tabIndex={0}>닉네임</TitleText>
        <ChangeWrapper>
          <SubText tabIndex={0}>{nickname}</SubText>
          <ButtonText onTouchStart={handleTouchChangeNickname} tabIndex={0}>
            변경
          </ButtonText>
        </ChangeWrapper>
      </UserInfoWrapper>
      <ChangeWrapper>
        <SubText tabIndex={0}>비밀번호</SubText>
        <ButtonText tabIndex={0} onTouchStart={handleTouchChangePassword}>
          변경
        </ButtonText>
      </ChangeWrapper>
      <ButtonText tabIndex={0} onTouchStart={handleTouchLogout}>
        로그아웃
      </ButtonText>
    </UserPageContainer>
  );
};

export default UserViewPage;
