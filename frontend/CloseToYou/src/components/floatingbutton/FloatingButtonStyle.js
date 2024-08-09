import styled from "@emotion/styled";

export const ButtonContainer = styled.div`
  border-radius: 50%;
  width: 4.375rem;
  height: 4.375rem;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.type === "delete"  ? "#FFFFFF" : "#FF6969")};
  border: 1px solid #aaaaaa;
  cursor: pointer;
  position: fixed;
  right: ${props => (props.type === 'delete' ? 'unset' : '30px')}; /* 조건부 위치 설정 */
  left: ${props => (props.type === 'delete' ? '30px' : 'unset')}; /* 조건부 위치 설정 */
  bottom: 20px;
  z-index: 1000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  &:focus {
    outline: none;
    border: 1px solid #aaaaaa;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

export default ButtonContainer;
