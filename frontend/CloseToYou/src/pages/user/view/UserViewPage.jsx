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

const UserViewPage = () => {
  const [isToggle, setIsToggle] = useState(false);

  const { nickname, email, isHighContrast, loadUserInfo, editHighContrast } = useUserStore();

  const navigate = useNavigate();

  useEffect(() => {
    // Cookies.set(
    //   "accessToken",
    //   "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcyMzQ5NTU0OSwiZW1haWwiOiJocmIuaGFycGVyQGdtYWlsLmNvbSIsImlkIjoxM30.Q4xqqDSdYwnhwgC2cF6VheRFR_7k5CJtb-vbbkRs6_i3VeTsn0J1M0HYOvw8vL8fC7Nao8xVXVVjBbgXxIQBgQ",
    // );
    (!nickname || !email) && loadUserInfo();
    setIsToggle(isHighContrast);
  }, []);

  const handleTouchChangeNickname = e => {
    navigate("/nickname");
  };
  const handleTouchChangePassword = () => {
    navigate("/password");
  };

  const handleTouchLogout = e => {
    e.target.focus();
    window.confirm("정말 로그아웃 하세요?🥺");
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
        <SubText tabIndex={0}>비밀 번호</SubText>
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
