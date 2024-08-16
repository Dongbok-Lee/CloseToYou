import styled from "@emotion/styled";

const TextInputStyle = styled.input`
  box-sizing: border-box;

  border-radius: 0.3125rem;
  border: 0.5px solid ${props => props.theme.colors.border[props.theme.mode]};

  width: 100%;
  height: 3.125rem;

  background-color: ${props => props.theme.colors.background[props.theme.mode]};

  padding-left: 1.25rem;

  color: ${props => props.theme.colors.text[props.theme.mode]};

  font-size: 1.25rem;
  font-weight: 400;

  cursor: pointer;

  &::placeholder {
    color: ${props => props.theme.colors.border[props.theme.mode]};
  }

  &:focus {
    border: 3px solid ${props => props.theme.colors.point[props.theme.mode]};
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
