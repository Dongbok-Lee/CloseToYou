import {
  ButtonText,
  ChangeBox,
  HighContrastContainer,
  UserInfoContainer,
  UserPageContainer,
  WelcomeContainer,
} from "./UserPageStyle";
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

const UserPage = () => {
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
      <HighContrastContainer>
        <span>고대비 모드</span>
        <ToggleButton isOn={isToggle} setIsOn={setIsToggle} />
      </HighContrastContainer>
      <WelcomeContainer>
        <span className="title-text">{user.nickname}</span>
        <span className="sub-text">님, 안녕하세요!</span>
      </WelcomeContainer>
      <UserInfoContainer>
        <p className="title-text">이메일</p>
        <p className="sub-text">{user.email}</p>
      </UserInfoContainer>
      <UserInfoContainer>
        <p className="title-text">닉네임</p>
        <ChangeBox onTouchStart={handleTouchChangeNickname}>
          <p className="sub-text">{user.nickname}</p>
          <ButtonText>변경</ButtonText>
        </ChangeBox>
      </UserInfoContainer>
      <ChangeBox>
        <p className="sub-text">비밀 번호</p>
        <ButtonText onTouchStart={handleTouchChangePassword}>변경</ButtonText>
      </ChangeBox>
      <ButtonText onTouchStart={handleTouchLogout}>로그아웃</ButtonText>
    </UserPageContainer>
  );
};

export default UserPage;
