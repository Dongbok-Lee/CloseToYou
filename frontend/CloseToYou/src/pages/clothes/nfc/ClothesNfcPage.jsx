import React, { useCallback, useEffect, useState } from "react";
import { SkipContainer, NfcImg, NfcText, SkipButton } from "./ClothesNfcPageStyle";

const NFCPage = () => {
  const [serialNumber, setSerialNumber] = useState("");

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
    setSerialNumber(serialNumber);
  };

  useEffect(() => {
    scan();
  }, [scan]);

  return (
    <SkipContainer className="page">
      <div style={{ height: "150px" }}>
        <p>Serial Number: {serialNumber}</p>
      </div>
    </SkipContainer>
  );
};

export default NFCPage;
