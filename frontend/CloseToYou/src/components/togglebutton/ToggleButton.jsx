import  { useState } from 'react';
import { ToggleContainer, ToggleCircle } from './ToggleButtonStyle';

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <ToggleContainer onClick={handleToggle} isOn={isOn}>
      <ToggleCircle isOn={isOn} />
    </ToggleContainer>
  );
};

export default ToggleButton;
