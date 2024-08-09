import styled from "@emotion/styled";

const SearchCardStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  height: 5rem;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid rgba(255, 105, 105, 1);
  border-radius: 0.625rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  -webkit-tap-highlight-color: transparent;

  .left-box {
    width: 5rem;
    height: 5rem;
    background: center no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .right-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    text-align: left;
    padding: 1rem;

    .name {
      font-size: 1.25rem;
      font-weight: 400;
    }

    .location {
      font-size: 1.25rem;
      color: gray;
    }
  }

  &:focus {
    border: 3px solid rgba(255, 105, 105, 1);
    outline: none;

    .location {
      color: rgba(255, 105, 105, 1);
      font-weight: 600;
    }
  }
`;

export default SearchCardStyle;
