import styled from "@emotion/styled";

export const SearchBoxContainer = styled.div`
  width: 95%;
  height: 2.5rem;
  display: flex;
  align-items: center;
  border-radius: 0.625rem;
  border: ${(props) => (props.isFocused ? "3px solid #FF6969" : "2px solid #FF6969")};
  background: #fff;
  margin: 3rem auto 1rem;
  padding: 0 0.3rem;

  .input {
    flex-grow: 1;
    height: 95%;
    width: 90%;
    border: none;
    outline: none;
    font-size: 1.5rem;
  }

  .icon-container {
    width: ${(props) => (props.isFocused ? "10%" : "8%")};
    height: ${(props) => (props.isFocused ? "100%" : "90%")};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: width 0.3s, height 0.3s;
  }

  .icon {
    width: 100%;
    height: 100%;
  }
`;
