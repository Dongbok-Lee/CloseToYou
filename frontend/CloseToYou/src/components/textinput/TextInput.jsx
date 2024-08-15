import TextInputStyle from "./TextInputStyle";

const TextInput = ({
  textInputType,
  textInputValue,
  textInputSize,
  textInputPlaceholder,
  handleChangeTextInput,
  handleTouchEnd,
}) => {
  return (
    <TextInputStyle
      type={textInputType}
      value={textInputValue}
      textInputSize={textInputSize}
      placeholder={textInputPlaceholder}
      onChange={handleChangeTextInput}
      onTouchEnd={handleTouchEnd}
    ></TextInputStyle>
  );
};

export default TextInput;
