import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  LastWornDateText
} from './ClothesDetailPageStyle';
import FloatingButton from '../../../components/floatingbutton/FloatingButton';
import tempImage from '../../../assets/icons/temp-image.png';

const ClothesDetailPage = () => {
  const [details, setDetails] = useState({
    clothesId: '',
    nickname: '산뜻 노랑',
    closetNickname: '',
    color: 'yellow',
    type: 'shirt',
    pattern: '무지',
    season: '봄, 가을',
    size: 'L',
    memo: '산뜻한 봄에 피크닉 가고 싶을 때 입을 티셔츠',
    location: 'A-14',
    imageUrl: tempImage,
    lastWornDate: '2023-08-01'
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const handleEditClick = () => {
    navigate(`/clothes/edit/${id}`);
  };

  return (
    <ClothesDetailPageContainer className="page">
      <ClothesNameText aria-label="옷 별명">{details.nickname}</ClothesNameText>
      <ImageContainer>
        <img src={details.imageUrl} alt="옷 이미지" />
      </ImageContainer>
      <LocationInfoText aria-label="위치 정보">{details.location}</LocationInfoText>

      <DetailContainer>
        <TabText aria-label="기본 정보">기본 정보</TabText>
        {[
          { title: '색상', info: details.color },
          { title: '종류', info: details.type },
          { title: '패턴', info: details.pattern },
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
          { title: '사이즈', info: details.size },
          { title: '계절감', info: details.season },
        ].map((item, index) => (
          <DetailItem key={index}>
            <DetailTitleText aria-label={item.title}>{item.title}</DetailTitleText>
            <DetailInfoText>{item.info}</DetailInfoText>
          </DetailItem>
        ))}
      </DetailContainer>

      <DetailContainer>
        <TabText aria-label="메모">메모</TabText>
        <DetailItem>
          <DetailInfoText>{details.memo}</DetailInfoText>
        </DetailItem>
      </DetailContainer>

      <LastWornDateText aria-label="최근 입은 날짜">최근 입은 날짜: {details.lastWornDate}</LastWornDateText>

      <FloatingButton type="edit" onTouchStart={handleEditClick} aria-label="편집 버튼" />
    </ClothesDetailPageContainer>
  );
};

export default ClothesDetailPage;
