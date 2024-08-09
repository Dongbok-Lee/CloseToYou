import styled from "@emotion/styled";

export const TitleText = styled.p`
  font-weight: 700;
  font-size: 1.5rem;
  tab-index: 0;
`;

export const SubText = styled.p`
  font-weight: 400;
  font-size: 1.25rem;
`;

export const UserPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 75vh;
  gap: 3rem;

  p {
    margin: 0;
  }
`;

export const HighContrastWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;

  span {
    font-size: 1.5rem;
  }
`;

export const WelcomeWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ChangeWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonText = styled.p`
  font-weight: 700;
  font-size: 1.5rem;
  color: #ff6969;
  text-align: center;
  cursor: pointer;

  &:focus {
    text-decoration-line: underline;
  }
`;
