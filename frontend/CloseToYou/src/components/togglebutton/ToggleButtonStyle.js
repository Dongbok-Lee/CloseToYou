import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const toggleOn = keyframes`
  0% { transform: translateX(0.125rem); }
  100% { transform: translateX(1.875rem); }
`;

const toggleOff = keyframes`
  0% { transform: translateX(1.875rem); }
  100% { transform: translateX(0.125rem); }
`;

export const ToggleContainer = styled.div`
  width: 3.75rem;
  height: 1.875rem;
  background: ${(props) => (props.isOn ? '#FF6969' : '#FFF')};
  border: 2px solid ${(props) => (props.isOn ? '#FFF' : '#FF6969')};
  border-radius: 1.875rem;
  display: flex;
  align-items: center;
  padding: 0.25rem;
  cursor: pointer;
  transition: background 0.3s;

  .toggle-circle {
    width: 1.375rem;
    height: 1.375rem;
    background: #FFF;
    border: 2px solid #FF6969;
    border-radius: 50%;
    margin-left: 0.125rem;
    transform: translateX(0.125rem);
    animation: ${(props) => (props.isOn ? toggleOn : toggleOff)} 0.3s forwards;
  }
`;

export const ToggleCircle = styled.div`
  width: 1.375rem;
  height: 1.375rem;
  background: #FFF;
  border: 2px solid #FF6969;
  border-radius: 50%;
  margin-left: 0.125rem;
  transform: translateX(0.125rem);
  animation: ${(props) => (props.isOn ? toggleOn : toggleOff)} 0.3s forwards;
`;
