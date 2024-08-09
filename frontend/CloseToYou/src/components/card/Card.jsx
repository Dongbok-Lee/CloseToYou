import { CardContainer } from "./CardStyle";
import { useState } from "react";

const Card = ({ handleTouch, handleDoubleClick, Icon, FocusIcon, isFocused }) => {
  return (
    <CardContainer
      onTouchStart={handleTouch}
      onDoubleClick={handleDoubleClick}
      tabIndex={0}
      isFocused={isFocused}
    >
      {isFocused ? <FocusIcon /> : <Icon />}
    </CardContainer>
  );
};

export default Card;
