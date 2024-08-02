import styled from '@emotion/styled';

export const SearchBoxContainer = styled.div`
  width: 80%;
  height: 3.125rem;
  display: flex;
  align-items: center;
  border-radius: 0.625rem;
  border: ${(props) => (props.isFocused ? '3px solid #FF6969' : '2px solid #FF6969')};
  background: #FFF;
  padding: 0 1rem;
  margin: 0 auto;

  .input {
    flex-grow: 1;
    height: 100%;
    border: none;
    outline: none;
    font-size: 1.5rem;
    padding: 0 0.5rem;
  }

  .IconContainer {
    width: ${(props) => (props.isFocused ? '35px' : '30px')};
    height: ${(props) => (props.isFocused ? '35px' : '30px')};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: width 0.3s, height 0.3s;
  }

  .icon {
    width: 100%;
    height: 100%;
  }
`;
