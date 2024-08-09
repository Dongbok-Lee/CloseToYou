import styled from '@emotion/styled';

const SelectStyle = styled.div`
  select {
    height: 2.5rem;
    width: 8.125rem !important;
    padding: 0.5rem;
    border: 1px solid rgba(169, 169, 169, 1);
    border-radius: 0.3125rem;
    font-size: 1.25rem;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);

    &:focus {
      border-color: #FF6969;
      outline: none;
    }

    option:focus {
      background-color: #FF6969;
      color: #FFF;
    }
  }
`;

export default SelectStyle;
