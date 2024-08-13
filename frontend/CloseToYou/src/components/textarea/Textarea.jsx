import React, { useState, useEffect } from "react";
import TextareaStyle from "./TextareaStyle";

const Textarea = ({ initItem, textareaPlaceholder, onChange }) => {

  const [text, setText] = useState(initItem);

  useEffect(() => {
    setText(initItem)
  }, [initItem])

  const handleResize = e => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const handleChangeTextLength = event => {
    const text = event.target;
    const textLength = text.value.length;

    if (textLength > 50) {
      text.value = text.value.substring(0, 50);
    }

    if (onChange) {
      onChange(text.value)
    }
  };

  return (
    <TextareaStyle
      placeholder={textareaPlaceholder}
      onChange={handleChangeTextLength}
      onKeyUp={handleResize}
      onKeyDown={handleResize}
      rows="3"
      value={text}
    >
    </TextareaStyle>
  );
};

export default Textarea;
