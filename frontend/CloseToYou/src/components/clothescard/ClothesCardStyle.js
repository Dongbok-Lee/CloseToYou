import styled from '@emotion/styled';
import { colors } from '../../constants/colors';

const ClothesCardStyle = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  -webkit-tap-highlight-color: transparent;

  .clothesCardIconBox {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.625rem;
    border: 1px solid ${colors.point[0]};
    width: 15.25rem;
    height: 15.25rem;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    &:focus {
      border: 3px solid ${colors.point[0]};
      outline: none;
    }
  }

  .clothesCardIcon {
    width: 13rem;
    height: 13rem;
    background: ${props => `url(${props.iconUrl}) center no-repeat`};
    background-size: contain;
  }
`;

export default ClothesCardStyle;
