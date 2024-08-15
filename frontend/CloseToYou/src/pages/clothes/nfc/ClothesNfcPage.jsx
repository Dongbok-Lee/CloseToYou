import React, { useCallback, useEffect, useState } from "react";
import { SkipContainer, NfcImg, NfcText, SkipButton } from "./ClothesNfcPageStyle";
import NFCImg from "../../../assets/icons/nfc.png";
import { useNavigate, useParams } from "react-router-dom";
import useClothesStore from "../../../stores/clothes";

const NFCPage = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [nfcId, setNfcId] = useState(null);
  const navigate = useNavigate();
  const { id: skipClothesId } = useParams();
  const loadClothesByNfc = useClothesStore(state => state.loadClothesByNfc);
  const { focusedClothesId, clearFocusedClothesId } = useClothesStore();
  const [clothesId, setClothesId] = useState(undefined);

  const scan = useCallback(async () => {
    if ("NDEFReader" in window) {
      try {
        const ndef = new window.NDEFReader();
        await ndef.scan();

        console.log("NFC 스캔이 성공적으로 시작되었습니다.");
        ndef.onreadingerror = () => {
          console.log("NFC 태그에서 데이터를 읽을 수 없습니다. 다른 태그를 시도해보세요.");
        };

        ndef.onreading = event => {
          console.log("NDEF 메시지가 읽혔습니다.");
          onReading(event);
        };
      } catch (error) {
        console.log(`오류 발생! 스캔을 시작할 수 없습니다: ${error}.`);
      }
    }
  }, []);

  const onReading = ({ serialNumber }) => {
    const nfcId = convertSerialNumberToNfcId(serialNumber);
    setSerialNumber(serialNumber);
    setNfcId(nfcId);
  };

  const convertSerialNumberToNfcId = serialNumber => {
    const hexString = serialNumber.replace(/-/g, "").replace(/:/g, "");
    const nfcId = parseInt(hexString, 16);
    return nfcId;
  };

  useEffect(() => {
    scan();
  }, [scan]);

  useEffect(() => {
    if (clothesId !== undefined) {
      navigate(`/clothes/${clothesId}`);
    } else {
      console.log("해당 NFC ID에 대한 옷 정보를 찾을 수 없습니다.");
    }
  }, [clothesId, navigate]);

  useEffect(() => {
    const fetchClothesId = async () => {
      try {
        const clothesId = await loadClothesByNfc(nfcId);
        setClothesId(clothesId);
      } catch (error) {
        console.log("옷 정보를 불러오는 중 오류가 발생했습니다:", error);
      }
    };

    if (nfcId !== null) {
      fetchClothesId();
    }
  }, [nfcId, loadClothesByNfc]);

  const handleSkip = () => {
    if (focusedClothesId) {
      navigate(`/clothes/edit/${focusedClothesId}`);
      clearFocusedClothesId();
    } else if (skipClothesId) {
      navigate(`/clothes/edit/${skipClothesId}`);
    } else {
      console.log("옷 ID가 유효하지 않습니다.");
    }
  };

  return (
    <SkipContainer className="page">
      <NfcImg src={NFCImg} alt="NFC 이미지" />
      <NfcText>
        핸드폰의 뒷면에
        <br />
        옷의 NFC 태그를
        <br />
        가져다 대주세요
      </NfcText>
      <SkipButton onClick={handleSkip} aria-label="건너뛰기 버튼">
        Skip
      </SkipButton>
    </SkipContainer>
  );
};

export default NFCPage;
