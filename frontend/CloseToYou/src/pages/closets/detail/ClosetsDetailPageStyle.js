import styled from "@emotion/styled";

export const ClosetDetailPageContainer = styled.div`
  display: flex;

  flex-direction: column;

  gap: 3rem;
`;

export const NicknameBox = styled.div`
  display: flex;

  width: 100%;

  justify-content: center;

  margin-top: 3rem;
`;

export const ClosetNickname = styled.p`
  color: rgba(255, 105, 105, 1);

  text-align: center;
  font-size: 2rem;
  font-weight: 700;
`;

export const WeatherWrapper = styled.div`
  display: flex;

  width: 100%;

  flex-direction: column;
`;

export const WeatherText = styled.p`
  text-align: right;

  font-size: 1.25rem;
  font-weight: 400;
`;

export const WeatherApiWrapper = styled.div`
  display: flex;

  gap: 0.5rem;

  justify-content: flex-end;
`;

export const WeatherImg = styled.img`
  width: 1.875rem;
  height: 1.875rme;
`;

export const WeatherTemp = styled.div`
  font-size: 1.25rem;
  font-weight: 400;
`;

export const ClosetContentWrapper = styled.div`
  display: flex;

  flex-direction: column;

  gap: 2rem;
`;

export const ClosetClothesText = styled.div`
  font-size: 1.5rem;
  font-weight: 400;
`;
export const ClosetConditionWrapper = styled.div``;

export const ClosetTemp = styled.p`
  font-size: 1.25rem;
  font-weight: 400;
`;

export const ClosetHumi = styled.p`
  font-size: 1.25rem;
  font-weight: 400;
`;
