import ButtonStyle from "./ButtonStyle";

const Button = ({ children, btnSize, btnColor }) => {
  const handleClick = () => {
    document.getElementById("button").blur();
  };

  return (
    <ButtonStyle id="button" btnSize={btnSize} btnColor={btnColor} onClick={handleClick}>
      {children}
    </ButtonStyle>
  );
};

export default Button;
