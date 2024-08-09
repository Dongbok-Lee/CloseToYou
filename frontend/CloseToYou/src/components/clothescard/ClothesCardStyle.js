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
    width: 15.25rem;
    height: 15.25rem;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    &:focus {
      border: 3px solid rgba(255, 105, 105, 1);
      outline: none;
    }
  }

  .clothes-card-icon {
    width: 13rem;
    height: 13rem;
    background: ${props => `url(${props.iconUrl}) center no-repeat`};
    background-size: contain;

   }
`;

export default ClothesCardStyle;
