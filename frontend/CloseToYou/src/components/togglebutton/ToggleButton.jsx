import { useState } from "react";
import { ToggleContainer, ToggleCircleIcon } from "./ToggleButtonStyle";

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <ToggleContainer onTouchStart={handleToggle} isOn={isOn}>
      <ToggleCircleIcon isOn={isOn} />
    </ToggleContainer>
  );
};

export default ToggleButton;
