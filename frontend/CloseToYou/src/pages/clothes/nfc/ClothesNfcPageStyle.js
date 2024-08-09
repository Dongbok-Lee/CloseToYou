import styled from '@emotion/styled';

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

export default SkipContainer;
