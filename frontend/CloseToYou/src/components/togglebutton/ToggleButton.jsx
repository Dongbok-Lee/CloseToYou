import { ToggleCircleIcon, ToggleContainer } from "./ToggleButtonStyle";
import { useUserStore } from "../../stores/user.jsx";

const ToggleButton = ({ isOn, setIsOn }) => {
  const { editHighContrast } = useUserStore();

  const handleToggle = async () => {
    setIsOn(!isOn);
    await editHighContrast(isOn);
  };

  return (
    <ToggleContainer onTouchStart={handleToggle} isOn={isOn}>
      <ToggleCircleIcon isOn={isOn} />
    </ToggleContainer>
  );
};

export default ToggleButton;
