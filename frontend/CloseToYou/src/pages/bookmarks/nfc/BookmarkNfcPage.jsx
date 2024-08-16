import React, { useCallback, useEffect, useState } from "react";
import { NfcImg, NfcText, SkipContainer } from "./BookmarkNfcPageStyle.js";
import NFCImg from "../../../assets/icons/nfc.png";
import { useLocation, useNavigate } from "react-router-dom";
import useBookmarkStore from "../../../stores/bookmark.jsx";
import useClothesStore from "../../../stores/clothes.jsx";

const NFCPage = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [nfcId, setNfcId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { loading, addClothesInBookmark } = useBookmarkStore();
  const { loadClothesByNfc } = useClothesStore();

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
    return parseInt(hexString, 16);
  };

  useEffect(() => {
    scan();
  }, [scan]);

  useEffect(() => {
    const fetchClothesIdAndAddClothesInBookmark = async () => {
      try {
        const clothesId = await loadClothesByNfc(nfcId);
        await addClothesInBookmark(location.pathname.split("/")[2], clothesId);
      } catch (error) {
        console.log("옷 정보를 불러오는 중 오류가 발생했습니다:", error);
      }
    };

    if (nfcId !== null) {
      fetchClothesIdAndAddClothesInBookmark();
    }
  }, [nfcId, loadClothesByNfc]);

  useEffect(() => {
    if (!loading) {
      navigate(`/bookmarks/${location.pathname.split("/")[2]}`);
    } else {
      console.log("해당 NFC ID에 대한 옷 정보를 찾을 수 없습니다.");
    }
  }, [loading, navigate]);

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
    </SkipContainer>
  );
};

export default NFCPage;
