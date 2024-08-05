import SocialButtonStyle from "./SocialButtonStyle";

const SocialButton = ({ socialBtnType, onTouchStart }) => {
  const handleClick = () => {
    document.getElementById("social-button").focus();
    document.getElementById("social-button").blur();
  };

  return (
    <SocialButtonStyle
      id="social-button"
      socialBtnType={socialBtnType}
      onTouchStart={onTouchStart}
      tabIndex={0}
    ></SocialButtonStyle>
  );
};

export default SocialButton;
