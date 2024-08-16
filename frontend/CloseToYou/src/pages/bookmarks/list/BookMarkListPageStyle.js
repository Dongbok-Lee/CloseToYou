import styled from "@emotion/styled";

export const BookMarkListPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  min-height: 75vh;

  p {
    margin: 0;
  }
`;

export const TextWrapper = styled.div`
  margin: 2.5rem  0 1.5rem 0;
  height: 3.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const TitleText = styled.p`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 400;
  color: ${props => props.theme.colors.text[props.theme.mode]};
`;

//TODO: color: ${props => props.theme.colors.point[0]};
export const SelectedText = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.point[props.theme.mode]};
`;

export const CardListWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
`;

export const FloatingButtonWraper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 4rem 0 1.25rem 0;
`;
