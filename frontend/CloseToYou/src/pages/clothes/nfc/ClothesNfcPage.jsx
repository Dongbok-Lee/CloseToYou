import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  SkipContainer,
  NfcImg,
  NfcText,
  SkipButton
} from './ClothesNfcPageStyle';
import NFCImg from '../../../assets/icons/nfc.png';

const NFCPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSkip = () => {
    navigate(`/clothes/${id}`);
  };

  return (
    <SkipContainer>
      <NfcImg src={NFCImg} alt="NFC 이미지" />
      <NfcText>옷장의 리더기에<br />NFC 태그를 찍어주세요</NfcText>
      <SkipButton onTouchStart={handleSkip} aria-label="건너뛰기 버튼">Skip</SkipButton>
    </SkipContainer>
  );
};

export default NFCPage;
