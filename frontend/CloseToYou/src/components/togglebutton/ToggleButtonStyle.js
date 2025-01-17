import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const toggleOn = keyframes`
    0% {
        transform: translateX(0.15rem);
    }
    100% {
        transform: translateX(2.2rem);
    }
`;

const toggleOff = keyframes`
    0% {
        transform: translateX(2.2rem);
    }
    100% {
        transform: translateX(0.15rem);
    }
`;

export const ToggleContainer = styled.div`
  width: 4rem;
  height: 1.6rem;
  background: ${props =>
    props.isOn
      ? props.theme.colors.point[props.theme.mode]
      : props.theme.colors.background[props.theme.mode]};
  border: 2px solid
    ${props =>
      props.isOn
        ? props.theme.colors.background[props.theme.mode]
        : props.theme.colors.point[props.theme.mode]};
  border-radius: 2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.125rem 0;
  transition: background 0.3s;
`;

export const ToggleCircleIcon = styled.div`
  width: 1.3rem;
  height: 1.3rem;
  background: ${props => props.theme.colors.background[props.theme.mode]};
  border: 2px solid ${props => props.theme.colors.point[props.theme.mode]};
  border-radius: 50%;
  margin: 0 0.1rem;
  transform: translateX(0.125rem);
  animation: ${props => (props.isOn ? toggleOn : toggleOff)} 0.3s forwards;
`;
