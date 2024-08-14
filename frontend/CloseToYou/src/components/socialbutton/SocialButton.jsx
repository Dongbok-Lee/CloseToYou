import SocialButtonStyle from "./SocialButtonStyle";

const SocialButton = ({ socialBtnType, onTouchStart }) => {
  return (
    <SocialButtonStyle
      socialBtnType={socialBtnType}
      onTouchStart={onTouchStart}
      tabIndex={0}
    ></SocialButtonStyle>
  );
};

export default SocialButton;
