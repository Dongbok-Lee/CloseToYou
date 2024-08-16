import styled from "@emotion/styled";

const SocialButtonStyle = styled.div`
  box-sizing: border-box;

  border-radius: 50% 50%;

  width: 4.375rem;
  height: 4.375rem;

  cursor: pointer;

  -webkit-tap-highlight-color: transparent;

  background-size: cover;
  background-position: center;

  &:focus {
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.4) inset;

    outline: none;
  }
`;

export default SocialButtonStyle;
