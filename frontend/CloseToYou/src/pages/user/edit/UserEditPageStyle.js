import styled from "@emotion/styled";

export const UserEditPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 75vh;
  gap: 5rem;
`;

export const TextWrapper = styled.div`
  margin-top: 8rem;
  text-align: center;
  tab-index: var(0);
`;

export const TitleText = styled.p`
  font-size: 1.25rem;
  tab-index: var(0);
  margin: 0;
  font-weight: 600;
`;

export const SubText = styled.p`
  font-weight: 400;
  font-size: 1.2rem;
  tab-index: var(0);
  margin: 0;
`;

export const PointText = styled.span`
  color: ${props => props.theme.colors.point[props.theme.mode]};
`;

export const TextInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;
