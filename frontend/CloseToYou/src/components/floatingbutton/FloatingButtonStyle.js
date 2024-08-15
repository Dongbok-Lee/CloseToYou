import styled from "@emotion/styled";
import { colors } from "../../constants/colors";

export const ButtonContainer = styled.div`
  border-radius: 50%;
  width: 4.375rem;
  height: 4.375rem;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.isDeleteType ? colors.background[0] : colors.point[0])};
  border: 1px solid ${colors.border[0]};
  cursor: pointer;
  position: absolute;
  ${props => (props.isDeleteType ? "left: 1.8rem;" : "right: 1.8rem;")}
  z-index: 1000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  &:focus {
    outline: none;
    border: 1px solid ${colors.border[0]};
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

export default ButtonContainer;
