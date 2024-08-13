import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ClothesDetailPageContainer,
  ClothesNameText,
  TabText,
  DetailContainer,
  DetailItem,
  DetailTitleText,
  DetailInfoText,
  LocationInfoText,
  ImageContainer,
  LastWornDateText,
  PageContainer,
} from "./ClothesDetailPageStyle";
import FloatingButton from "../../../components/floatingbutton/FloatingButton";
import tempImage from "../../../assets/icons/temp-image.png";
import { getClothesById } from "../../../api/clothes"; // API 요청 함수 import

const ClothesDetailPage = () => {
  const [details, setDetails] = useState({
    clothesId: "",
    nickname: "",
    closetNickname: "",
    color: "",
    type: "",
    pattern: "",
    season: "",
    size: "",
    memo: "",
    location: "",
    imageUrl: tempImage,
    lastWornDate: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchClothesDetails = async () => {
      try {
        const response = await getClothesById(id);
        const clothesData = response.data;

        setDetails({
          clothesId: clothesData.clothesId,
          nickname: clothesData.nickname,
          closetNickname: clothesData.closetNickname,
          color: clothesData.color,
          type: clothesData.type,
          pattern: clothesData.pattern,
          season: clothesData.season,
          size: clothesData.size,
          memo: clothesData.memo,
          location: clothesData.location,
          imageUrl: clothesData.imageUrl || tempImage,
          lastWornDate: clothesData.lastWornDate || "N/A",
        });
      } catch (error) {
        console.error("옷 정보를 가져오는 데 실패했습니다:", error);
      }
    };

    fetchClothesDetails();
  }, [id]);

  const handleNavigateToEdit = () => {
    navigate(`/clothes/edit/${id}`);
  };

  return (
    <ClothesDetailPageContainer className="page">
      <PageContainer>
        <ClothesNameText aria-label="옷 별명">{details.nickname || "별명 없음"}</ClothesNameText>
        <ImageContainer>
          <img src={details.imageUrl} alt="옷 이미지" />
        </ImageContainer>
        <LocationInfoText aria-label="위치 정보">{details.location}</LocationInfoText>

        <DetailContainer>
          <TabText aria-label="기본 정보">기본 정보</TabText>
          {[
            { title: "색상", info: details.color },
            { title: "종류", info: details.type },
            { title: "패턴", info: details.pattern },
          ].map((item, index) => (
            <DetailItem key={index}>
              <DetailTitleText aria-label={item.title}>{item.title}</DetailTitleText>
              <DetailInfoText>{item.info}</DetailInfoText>
            </DetailItem>
          ))}
        </DetailContainer>

        <DetailContainer>
          <TabText aria-label="추가 정보">추가 정보</TabText>
          {[
            { title: "사이즈", info: details.size },
            { title: "계절감", info: details.season },
          ].map((item, index) => (
            <DetailItem key={index}>
              <DetailTitleText aria-label={item.title}>{item.title}</DetailTitleText>
              <DetailInfoText>{item.info}</DetailInfoText>
            </DetailItem>
          ))}
        </DetailContainer>

        <DetailContainer>
          <TabText aria-label="메모">메&emsp;&emsp;모</TabText>
          <DetailItem>
            <DetailInfoText>{details.memo}</DetailInfoText>
          </DetailItem>
          <LastWornDateText aria-label="최근 입은 날짜">
            최근 입은 날짜: {details.lastWornDate}
            <FloatingButton
              type="edit"
              onTouchStart={handleNavigateToEdit}
              aria-label="편집 버튼"
            />
          </LastWornDateText>
        </DetailContainer>
      </PageContainer>
    </ClothesDetailPageContainer>
  );
};

export default ClothesDetailPage;
