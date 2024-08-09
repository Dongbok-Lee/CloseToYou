import TextInputStyle from "./TextInputStyle";

const TextInput = ({ textInputType, textInputValue, textInputSize, textInputPlaceholder, handleChangeTextInput }) => {
  return (
    <TextInputStyle
      type={textInputType}
      value={textInputValue}
      textInputSize={textInputSize}
      placeholder={textInputPlaceholder}
      onChange={handleChangeTextInput}
    ></TextInputStyle>
  );
};

export default TextInput;
