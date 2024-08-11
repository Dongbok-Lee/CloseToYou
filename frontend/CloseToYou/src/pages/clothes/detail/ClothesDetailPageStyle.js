import styled from '@emotion/styled';

export const ClothesDetailPageContainer = styled.div``;

export const PageContainer = styled.div`
  bottom : 30%;
  flex-grow: 1;
`;

export const ClothesNameText = styled.h1`
  margin: 30px;
  color: #FF6969;
  font-family: "KoddiUD OnGothic";
  font-size: 1.5rem;
  font-weight: 700;
`;

export const LocationInfoText = styled.h1`
  font-family: "KoddiUD OnGothic";
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
`;

export const TabText = styled.div`
  width: 9.375rem;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 2.5rem;
  background: #FF6969;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFF;
  font-family: "KoddiUD OnGothic";
  font-size: 1.25rem;
  font-weight: 700;
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

export const DetailTitleText = styled.h2`
  color: #000;
  text-align: left;
  font-family: "KoddiUD OnGothic";
  font-size: 1.25rem;
  font-weight: 700;
`;

export const DetailInfoText = styled.p`
  color: #000;
  text-align: ${({ alignRight }) => (alignRight ? 'right' : 'left')};
  font-family: "KoddiUD OnGothic";
  font-size: 1.25rem;
  font-weight: 400;
`;

export const ImageContainer = styled.div`
  border: 1px solid #FF6969;
  height: 15.6rem;
  width: 15.6rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: #FFF;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LastWornDateText = styled.div`
  font-family: "KoddiUD OnGothic";
  font-size: 1rem;
  color: gray;
`;

export default ClothesDetailPageContainer;
