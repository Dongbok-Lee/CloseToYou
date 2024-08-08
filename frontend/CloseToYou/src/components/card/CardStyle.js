import styled from "@emotion/styled";

export const CardContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  border: 3px solid rgba(255, 105, 105, 1);
  width: 8.75rem;
  height: 8.75rem;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  -webkit-tap-highlight-color: transparent;
  background-color: ${props => props.isFocused && "#ff6969"};
`;
// TODO: background-color: ${props => props.theme.colors.point[0]}
