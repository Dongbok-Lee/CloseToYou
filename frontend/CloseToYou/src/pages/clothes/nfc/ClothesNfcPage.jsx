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
  const [recordId, setRecordId] = useState(null);
  useEffect(() => {
    const handleNfcScan = () => {
      if ("NDEFReader" in window) {
        try {
          const ndef = new NDEFReader();
          ndef.scan().then(() => {
            setError("Scan started successfully");
          });g

          ndef.onreadingerror = () => {
            setError("NFC 태그에서 데이터를 읽을 수 없습니다. 다른 태그를 시도해보세요.");
          };

          ndef.onreading = event => {
            console.log("NDEF message read.");
            const message = event.message;
            for (const record of message.records) {
              console.log("Record id:    " + record.id);
              setRecordId(record.id);
            }
          };
        } catch (error) {
          console.log(`Error! Scan failed to start: ${error}.`);
          setError("NFC 읽기에 실패했습니다.");
        }
      } else {
        setError("이 기기는 NFC를 지원하지 않습니다.");
        console.error("이 기기는 NFC를 지원하지 않습니다.");
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
      {alertText}
      {recordId && <div>Record ID: {recordId}</div>}
      {error && <div>{error}</div>}
      <SkipButton onClick={handleSkip} aria-label="건너뛰기 버튼">
        Skip
      </SkipButton>
    </SkipContainer>
  );
};

export default NFCPage;
