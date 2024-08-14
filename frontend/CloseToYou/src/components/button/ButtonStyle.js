import styled from "@emotion/styled";

const ButtonStyle = styled.button`
  box-sizing: border-box;

  border-radius: 0.625rem;
  border-color: rgba(255, 255, 255, 0);

  width: 100%;
  height: 3.75rem;

  background-color: rgba(255, 105, 105, 1);

  color: rgba(255, 255, 255, 1);

  text-align: center;
  font-size: 2rem;
  font-weight: 800;

  cursor: pointer;

  -webkit-tap-highlight-color: transparent;

  &:focus {
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.4) inset;
    outline: none;
  }

  ${({ btnSize }) =>
    btnSize === "small" &&
    `
    width: 5rem;
    height: 3.125rem;

    font-size: 1rem;
  `}

  ${({ btnSize }) =>
    btnSize === "medium" &&
    `
    width: 12.5rem;
    height: 3.125rem;

    font-size: 1.75rem;
  `}

  ${({ btnColor }) =>
    btnColor === "white" &&
    `
    border: 2px solid rgba(255, 105, 105, 1);

    background-color: rgba(255, 255, 255, 1);

    color: rgba(255, 105, 105, 1);
  `}

  ${({ btnColor }) =>
    btnColor === "gray" &&
    `
    border: 2px solid rgba(0, 0, 0, 1);
    
    background-color: rgba(255, 255, 255, 1);

    color: rgba(169, 169, 169, 1);
  `}
`;

export default ButtonStyle;
