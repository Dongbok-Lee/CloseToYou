import styled from '@emotion/styled';

const ClothesCardStyle = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  -webkit-tap-highlight-color: transparent;

  .clothes-card-icon-box {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.625rem;
    border: 1px solid rgba(255, 105, 105, 1);
    width: 16.25rem;
    height: 16.25rem;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    &:focus {
      border: 3px solid rgba(255, 105, 105, 1);
      outline: none;
    }
  }

  .clothes-card-icon {
    width: 14rem;
    height: 14rem;
    background: ${props => `url(${props.iconUrl}) center no-repeat`};
  }
`;

export default ClothesCardStyle;
