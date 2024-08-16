import styled from "@emotion/styled";

export const FilterListContainer = styled.div`
  z-index: 2000;
`;

export const FilterOpenTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  p {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 400;
  }

  .active-text {
    color: ${props => props.theme.colors.point[0]};
  }

  .not-active-text {
    color: ${props => props.theme.colors.text[0]};
  }
`;

export const FilterItemWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-top: 0.6rem;
  background-color: ${props => props.theme.colors.background[0]};
`;
