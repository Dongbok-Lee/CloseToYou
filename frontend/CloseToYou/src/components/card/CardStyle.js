import styled from "@emotion/styled";

export const CardContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  border: 3px solid ${props => props.theme.colors.point[0]};
  width: 32vw;
  height: 32vw;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  -webkit-tap-highlight-color: transparent;
  background-color: ${props =>
    props.isFocused ? props.theme.colors.point[0] : props.theme.colors.background[0]};
`;
