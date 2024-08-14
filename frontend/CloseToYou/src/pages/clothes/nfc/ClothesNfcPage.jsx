import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SkipContainer, NfcImg, NfcText, SkipButton } from "./ClothesNfcPageStyle";
import NFCImg from "../../../assets/icons/nfc.png";
import { useClothesStore } from "../../../stores/clothes";

const NFCPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const loadClothesByNfc = useClothesStore(state => state.loadClothesByNfc);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleNfcScan = async () => {
      try {
        const reader = new NDEFReader();
        await reader.scan();
        reader.addEventListener("reading", async ({ serialNumber }) => {
          const nfcId = parseInt(serialNumber.replace(/-/g, ""), 16);
          try {
            const clothesId = await loadClothesByNfc(nfcId);
            navigate(`/clothes/${clothesId}`);
          } catch (error) {
            setError("옷을 찾을 수 없습니다.");
            console.error("옷을 찾을 수 없습니다.", error);
          }
        });
      } catch (error) {
        setError("NFC 읽기에 실패했습니다.");
        console.error("NFC 읽기에 실패했습니다.", error);
      }
    };

    if (id) {
      handleNfcScan();
    }
  }, [navigate, loadClothesByNfc, id]);

  const handleSkip = () => {
    navigate(`/clothes/edit/${id}`);
  };

  return (
    <SkipContainer className="page">
      <NfcImg src={NFCImg} alt="NFC 이미지" />
      <NfcText>
        핸드폰의 뒷면에
        <br />
        옷의 NFC 태그를 찍어주세요
      </NfcText>
      {error && <div>{error}</div>}
      <SkipButton onClick={handleSkip} aria-label="건너뛰기 버튼">
        Skip
      </SkipButton>
    </SkipContainer>
  );
};

export default NFCPage;
