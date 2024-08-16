import SocialButtonStyle from "./SocialButtonStyle";
import Kakao from "../../assets/icons/kakao.svg?react";
import Google from "../../assets/icons/google.svg?react";

const SocialButton = ({ socialBtnType, handleTouchButton }) => {
  return (
    <SocialButtonStyle>
      {socialBtnType === "kakao" ? (
        <Kakao onTouchStart={handleTouchButton}></Kakao>
      ) : (
        <Google onTouchStart={handleTouchButton}></Google>
      )}
    </SocialButtonStyle>
  );
};

export default SocialButton;
