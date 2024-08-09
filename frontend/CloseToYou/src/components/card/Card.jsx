import { CardContainer } from "./CardStyle";

const Card = ({ handleTouch, Icon, FocusIcon, isFocused }) => {
  return (
    <CardContainer onTouchStart={handleTouch} tabIndex={0} isFocused={isFocused}>
      {isFocused ? <FocusIcon /> : <Icon />}
    </CardContainer>
  );
};

export default Card;
