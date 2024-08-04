import TextareaStyle from "./TextareaStyle";

const Textarea = ({ textareaPlaceholder }) => {
  const handleResize = e => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const handleChangeTextLength = e => {
    const text = e.target;
    const textLength = text.value.length;

    if (textLength > 50) {
      text.value = text.value.substring(0, 50);
    }
  };

  return (
    <TextareaStyle
      placeholder={textareaPlaceholder}
      onChange={handleChangeTextLength}
      onKeyUp={handleResize}
      onKeyDown={handleResize}
      rows="3"
    ></TextareaStyle>
  );
};

export default Textarea;
