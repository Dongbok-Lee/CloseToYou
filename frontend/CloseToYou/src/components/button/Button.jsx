import ButtonStyle from "./ButtonStyle";

const Button = ({ btnSize, btnColor, handleTouchButton, children }) => {
  return (
    <ButtonStyle btnSize={btnSize} btnColor={btnColor} onTouchStart={handleTouchButton}>
      {children}
    </ButtonStyle>
  );
};

export default Button;
