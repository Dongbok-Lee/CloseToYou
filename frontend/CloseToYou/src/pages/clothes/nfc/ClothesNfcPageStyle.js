import styled from '@emotion/styled';

export const SkipContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  position: relative;
`;

export const NfcImg = styled.img`
  margin-bottom: 20px;
`;

export const NfcText = styled.span`
  text-align: center;
  font-family: "KoddiUD OnGothic";
  font-size: 1.5rem;
  font-weight: 700;
  line-height: normal;
`;

export const SkipButton = styled.p`
  padding: 10px 20px;
  font-size: 1.25rem;
  border-radius: 5px;
  border: none;
  position: absolute;
  bottom: 2rem;
  right: 1.25rem;
  text-decoration: underline;
  text-underline-offset: 10px;

`;

export default SkipContainer;
