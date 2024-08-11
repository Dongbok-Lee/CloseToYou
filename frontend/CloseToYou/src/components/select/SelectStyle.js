import styled from '@emotion/styled';
import { colors } from '../../constants/colors';

const SelectStyle = styled.div`
  select {
    height: 2.5rem;
    width: 8.125rem !important;
    padding: 0.5rem;
    border: 1px solid ${colors.border[0]};
    border-radius: 0.3125rem;
    font-size: 1.25rem;
    font-weight: 400;
    color: ${colors.text[0]};

    &:focus {
      border-color: ${colors.point[0]};
      outline: none;
    }

    option:focus {
      background-color: ${colors.point[0]};
      color: ${colors.text[1]};
    }
  }
`;

export default SelectStyle;
