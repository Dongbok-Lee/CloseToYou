import styled from "@emotion/styled";

const HeaderContainer = styled.header`
  width: 100%;
  height: 3.125rem;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  background: ${props => props.theme.colors.point[props.theme.mode]};

  .header-content {
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .Button {
    width: 2.1875rem;
    height: 2.1875rem;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .IconContainer {
    display: flex;
  }

  .Title {
    color: ${props => props.theme.colors.background[props.theme.mode]};
    text-align: center;
    font-family: "KoddiUD OnGothic";
    font-size: 1.5rem;
    font-weight: 700;
  }

  .icon {
    width: 25px;
    height: 25px;
    vertical-align: middle;
  }
`;

export default HeaderContainer;
