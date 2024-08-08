import { ToggleContainer, ToggleCircleIcon } from "./ToggleButtonStyle";

const ToggleButton = ({ isOn, setIsOn }) => {
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
