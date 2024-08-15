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
import { getClothesById } from "../../../api/clothes";
import { filterLabels } from "../../../constants/filter";

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

  const fetchClothesDetails = async () => {
    try {
      const response = await getClothesById(id);
      const clothesData = response.data.data;

      setDetails({
        clothesId: clothesData.clothesId,
        nickname:
          clothesData.nickname ||
          `${filterLabels.color[clothesData.color]} ${filterLabels.category[clothesData.type]}`,
        closetNickname: clothesData.closetNickname || "설정안함",
        color: filterLabels.color[clothesData.color] || "설정안함",
        type: filterLabels.category[clothesData.type] || "설정안함",
        pattern: filterLabels.pattern[clothesData.pattern] || "설정안함",
        season: filterLabels.season[clothesData.season] || "설정안함",
        size: clothesData.size || "설정안함",
        memo: clothesData.memo || "메모없음",
        location: clothesData.location || "설정안함",
        imageUrl: clothesData.imageUrl || tempImage,
        lastWornDate: clothesData.lastWornDate || "입은 기록 없음",
      });
    } catch (error) {
      console.error("옷 정보를 가져오는 데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    fetchClothesDetails();
  }, [id]);

  const handleNavigateToEdit = e => {
    navigate(`/clothes/edit/${id}`);
  };

  return (
    <ClothesDetailPageContainer className="page">
      <PageContainer>
        <ClothesNameText aria-label="옷 별명">{details.nickname}</ClothesNameText>
        <ImageContainer>
          <img src={details.imageUrl} alt="옷 이미지" />
        </ImageContainer>
        <LocationInfoText aria-label="위치 정보">
          {details.closetNickname} {details.location}
        </LocationInfoText>

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
