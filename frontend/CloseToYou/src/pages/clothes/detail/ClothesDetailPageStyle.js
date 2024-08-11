import styled from '@emotion/styled';
import { colors } from '../../../constants/colors';

export const ClothesDetailPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

export const PageContainer = styled.div`
  flex-grow: 2;
  width: 100%;
`;

export const ClothesNameText = styled.h1`
  margin: 30px;
  color: ${colors.point[0]};
  font-family: "KoddiUD OnGothic";
  font-size: 1.5rem;
  font-weight: 700;
`;

export const LocationInfoText = styled.h1`
  font-family: "KoddiUD OnGothic";
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  color: ${colors.text[0]};
`;

export const TabText = styled.p`
  width: 9.375rem;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 2.5rem;
  background: ${colors.point[0]};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.text[1]};
  font-family: "KoddiUD OnGothic";
  font-size: 1.25rem;
  font-weight: 700;
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
  margin: 1rem auto;
`;

export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

export const DetailTitleText = styled.h2`
  color: ${colors.text[0]};
  text-align: left;
  font-family: "KoddiUD OnGothic";
  font-size: 1.25rem;
  font-weight: 700;
`;

export const DetailInfoText = styled.p`
  color: ${colors.text[0]};
  text-align: ${({ alignRight }) => (alignRight ? 'right' : 'left')};
  font-family: "KoddiUD OnGothic";
  font-size: 1.25rem;
  font-weight: 400;
`;

export const ImageContainer = styled.div`
  border: 1px solid ${colors.point[0]};
  height: 15.6rem;
  width: 15.6rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: ${colors.background[0]};
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LastWornDateText = styled.div`
  font-family: "KoddiUD OnGothic";
  font-size: 1rem;
  color: gray;
  margin-bottom: 4rem;
`;

export default ClothesDetailPageContainer;
