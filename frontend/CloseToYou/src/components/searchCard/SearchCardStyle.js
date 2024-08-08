import styled from "@emotion/styled";

const SearchCardStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10rem;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid rgba(255, 105, 105, 1);
  border-radius: 0.625rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  -webkit-tap-highlight-color: transparent;

  .left-box {
    margin-left: 2rem;

    .icon-box {
      width: 5rem;
      height: 5rem;

      .icon {
        width: 100%;
        height: 100%;
        background: url(src/assets/icons/etc/yellow-tshirt.svg) center no-repeat;
        background-size: cover;
      }
    }
  }

  .right-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    margin-right: 2rem;
    text-align: left;

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
