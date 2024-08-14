import React, { useState, useEffect } from "react";
import TextareaStyle from "./TextareaStyle";

const Textarea = ({ initItem = "", textareaPlaceholder, onChange }) => {
  const [text, setText] = useState(initItem);

  useEffect(() => {
    setText(initItem);
  }, [initItem]);

  useEffect(() => {
    const textarea = document.querySelector("textarea");
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [text]);

  const handleResize = e => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleChangeTextLength = event => {
    let value = event.target.value;

    if (value.length > 50) {
      value = value.substring(0, 50);
    }

    setText(value);
    if (onChange) {
      onChange(value);
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
    />
  );
};

export default Textarea;
