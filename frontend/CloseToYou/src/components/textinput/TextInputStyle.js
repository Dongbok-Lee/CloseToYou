import styled from "@emotion/styled";

const TextInputStyle = styled.input`
  box-sizing: border-box;

  border-radius: 0.3125rem;
  border: 0.5px solid rgba(0, 0, 0, 1);

  width: 18.75rem;
  height: 3.125rem;

  background-color: rgba(255, 255, 255, 1);

  padding-left: 1.25rem;

  color: rgba(0, 0, 0, 1);

  font-size: 1.25rem;
  font-weight: 400;

  cursor: pointer;

  &::placeholder {
    color: rgba(170, 170, 170, 1);
  }

  &:focus {
    border: 3px solid rgba(255, 105, 105, 1);
    outline: none;
  }

  ${({ textInputSize }) =>
    textInputSize === "small" &&
    `
		width: 8.125rem;
		height: 2.5rem;
	`}

  ${({ textInputSize }) =>
    textInputSize === "medium" &&
    `
		width: 12.5rem;
	`}
`;

export default TextInputStyle;
