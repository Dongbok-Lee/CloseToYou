import {
    ButtonText,
    ChangeWrapper,
    HighContrastWrapper, SubText, TitleText,
    UserInfoWrapper,
    UserPageContainer,
    WelcomeWrapper,
} from "./UserViewPageStyle.js";
import { ToggleContainer } from "../../../components/togglebutton/ToggleButtonStyle.js";
import { useEffect, useState } from "react";
import ToggleButton from "../../../components/togglebutton/ToggleButton.jsx";
import { useNavigate } from "react-router-dom";

// TODO: GET, /api/users
const user = {
  email: "chano@gmail.com",
  nickname: "기가차노",
  registTime: "",
  updateTime: "",
  isHighContrast: false,
};

const UserViewPage = () => {
  const [isToggle, setIsToggle] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsToggle(user.isHighContrast);
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
      <WelcomeWrapper tabIndex={0} title={`${user.nickname}님, 안녕하세요.`}>
        <TitleText>{user.nickname}</TitleText>
        <SubText>님, 안녕하세요!</SubText>
      </WelcomeWrapper>
      <UserInfoWrapper>
        <TitleText tabIndex={0}>이메일</TitleText>
        <SubText tabIndex={0}>{user.email}</SubText>
      </UserInfoWrapper>
      <UserInfoWrapper>
        <TitleText tabIndex={0}>닉네임</TitleText>
        <ChangeWrapper >
            <SubText tabIndex={0}>{user.nickname}</SubText>
          <ButtonText onTouchStart={handleTouchChangeNickname} tabIndex={0}>변경</ButtonText>
        </ChangeWrapper>
      </UserInfoWrapper>
      <ChangeWrapper>
        <SubText tabIndex={0}>비밀 번호</SubText>
        <ButtonText tabIndex={0} onTouchStart={handleTouchChangePassword}>변경</ButtonText>
      </ChangeWrapper>
      <ButtonText tabIndex={0} onTouchStart={handleTouchLogout}>로그아웃</ButtonText>
    </UserPageContainer>
  );
};

export default UserViewPage;
