import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ClothesDetailPageContainer,
  ClothesName,
  Tab,
  DetailContainer,
  DetailItem,
  DetailTitle,
  DetailInfo,
  LocationInfo,
} from './ClothesDetailPageStyle';
import FloatingButton from '../../../components/floatingbutton/FloatingButton';
import tempImage from '../../../assets/icons/temp-image.png';

const ClothesDetailPage = () => {
  const [details, setDetails] = useState({
    nickname: '산뜻 노랑',
    color: '노랑',
    type: '셔츠',
    pattern: '무지',
    size: 'L',
    texture: '면',
    seasonFeeling: '봄, 가을',
    memo: '산뜻한 봄에 피크닉 가고 싶을 때 입을 티셔츠',
    location: 'A-14',
  });

  const navigate = useNavigate();
  const { id = 0 } = useParams();

  const handleEditClick = () => {
    navigate(`/clothes/edit/${id}`);
  };

  return (
    <ClothesDetailPageContainer className="page">
      <ClothesName>{details.nickname}</ClothesName>
      <div
        style={{
          border: '1px solid #FF6969',
          height: '15.6rem',
          width: '15.6rem',
          flexShrink: '0',
          borderRadius: '0.625rem',
          background: '#FFF',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src={tempImage} alt="Clothes" />
      </div>
      <LocationInfo>{details.location}</LocationInfo>

      <DetailContainer>
        <Tab>기본 정보</Tab>
        {[
          { title: '색상', info: details.color },
          { title: '종류', info: details.type },
          { title: '패턴', info: details.pattern },
        ].map((item, index) => (
          <DetailItem key={index}>
            <DetailTitle>{item.title}</DetailTitle>
            <DetailInfo>{item.info}</DetailInfo>
          </DetailItem>
        ))}
      </DetailContainer>

      <DetailContainer>
        <Tab>추가 정보</Tab>
        {[
          { title: '사이즈', info: details.size },
          { title: '계절감', info: details.seasonFeeling },
        ].map((item, index) => (
          <DetailItem key={index}>
            <DetailTitle>{item.title}</DetailTitle>
            <DetailInfo>{item.info}</DetailInfo>
          </DetailItem>
        ))}
      </DetailContainer>

      <DetailContainer>
        <Tab>메모</Tab>
        <DetailItem>
          <DetailInfo>{details.memo}</DetailInfo>
        </DetailItem>
      </DetailContainer>

      <FloatingButton type="edit" onTouchStart={handleEditClick} />
    </ClothesDetailPageContainer>
  );
};

export default ClothesDetailPage;
