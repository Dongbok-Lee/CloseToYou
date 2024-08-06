import styled from '@emotion/styled';

export const ClothesDetailPageContainer = styled.div``;

export const SkipContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
`;

export const NfcImg = styled.img`
  margin-bottom: 20px;
`;

export const NfcText = styled.span`
  text-align: center;
  font-family: "KoddiUD OnGothic";
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const SkipButton = styled.p`
  padding: 10px 20px;
  font-size: 1.25rem;
  border-radius: 5px;
  border: none;
  position: absolute;
  bottom: 20px;
  right: 20px;
  text-decoration: underline;

`;

export const ClothesName = styled.h1`
  margin: 40px;
  color: #FF6969;
  font-family: "KoddiUD OnGothic";
  font-size: 1.5rem;
  font-weight: 700;
`;

export const LocationInfo = styled.h1`
  font-family: "KoddiUD OnGothic";
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
`;

export const Tab = styled.div`
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
  margin: 20px;
  padding: 20px;
`;

export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

export const DetailTitle = styled.h2`
  color: #000;
  text-align: left;
  font-family: "KoddiUD OnGothic";
  font-size: 1.25rem;
  font-weight: 700;
`;

export const DetailInfo = styled.p`
  color: #000;
  text-align: ${({ alignRight }) => (alignRight ? 'right' : 'left')};
  font-family: "KoddiUD OnGothic";
  font-size: 1.25rem;
  font-weight: 400;
`;

export default ClothesDetailPageContainer;
