import styled from "@emotion/styled";

const TextareaStyle = styled.textarea`
  box-sizing: border-box;

  border-radius: 0.3125rem;
  border: 0.5px solid rgba(0, 0, 0, 1);

  width: 100%;
  min-height: 6.25rem;

  background-color: rgba(255, 255, 255, 1);

  padding: 1rem;

  color: rgba(0, 0, 0, 1);

  font-size: 1.25rem;
  font-weight: 400;

  overflow: hidden;

  resize: none;

  &::placeholder {
    color: rgba(170, 170, 170, 1);
  }

  &:focus {
    border: 3px solid rgba(255, 105, 105, 1);
    outline: none;
  }
`;

export default TextareaStyle;
