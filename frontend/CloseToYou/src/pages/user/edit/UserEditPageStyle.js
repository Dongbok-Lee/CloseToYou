import styled from "@emotion/styled";

export const UserEditPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 75vh;
  gap: 8rem;
`;

export const TextWrapper = styled.div`
  margin-top: 15rem;
  text-align: center;
  tab-index: var(0);
`;

export const TitleText = styled.p`
  font-size: 1.5rem;
  tab-index: var(0);
  margin: 0;
  font-weight: 600;
`;

export const SubText = styled.p`
  font-weight: 400;
  font-size: 1.25rem;
  tab-index: var(0);
  margin: 0;
`;

// TODO: color: ${props => props.theme.colors.point[0]};
export const PointText = styled.span`
  color: #ff6969;
`;

export const TextInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
