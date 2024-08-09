import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ClothesEditPageContainer,
  ClothesNameText,
  TabText,
  DetailContainer,
  DetailItem,
  DetailTitleText,
  ButtonWrapper,
  ImageContainer,
  LocationInputContainer,
  TextInputStyled,
} from './ClothesEditPageStyle';
import TextArea from '../../../components/textarea/Textarea';
import TextInput from '../../../components/textinput/TextInput';
import Button from '../../../components/button/Button';
import Select from '../../../components/select/Select';
import tempImage from '../../../assets/icons/temp-image.png';

const ClothesEditPage = () => {
  const [nickname, setNickname] = useState('산뜻 노랑');
  const [color, setColor] = useState('노랑');
  const [type, setType] = useState('셔츠');
  const [pattern, setPattern] = useState('무지');
  const [size, setSize] = useState('L');
  const [texture, setTexture] = useState('면');
  const [season, setSeason] = useState('봄, 가을');
  const [memo, setMemo] = useState('산뜻한 봄에 피크닉 가고 싶을 때 입을 티셔츠');
  const [location, setLocation] = useState('A-14');

  const navigate = useNavigate();
  const { id } = useParams();

  const handleSave = () => {
    navigate(`/clothes/${id}`);
  };

  return (
    <ClothesEditPageContainer className="page">
      <ClothesNameText>
        <TextInput textInputPlaceholder={nickname} textInputSize="small" aria-label="옷 별명 입력" />
      </ClothesNameText>
      <ImageContainer>
        <img src={tempImage} alt="옷 이미지" />
      </ImageContainer>
      <LocationInputContainer>
        <TextInputStyled
          textInputPlaceholder={location}
          textInputSize="smaller"
          style={{ textAlign: 'center' }}
          aria-label="위치 입력"
        />
      </LocationInputContainer>
      <DetailContainer>
        <TabText aria-label="기본 정보">기본 정보</TabText>
        <DetailItem>
          <DetailTitleText aria-label="색상">색상</DetailTitleText>
          <Select initItem={color} type="color" />
        </DetailItem>
        <DetailItem>
          <DetailTitleText aria-label="종류">종류</DetailTitleText>
          <Select initItem={type} type="type" />
        </DetailItem>
        <DetailItem>
          <DetailTitleText aria-label="패턴">패턴</DetailTitleText>
          <Select initItem={pattern} type="pattern" />
        </DetailItem>
      </DetailContainer>
      <DetailContainer>
        <TabText aria-label="추가 정보">추가 정보</TabText>
        <DetailItem>
          <DetailTitleText aria-label="사이즈">사이즈</DetailTitleText>
          <TextInput textInputPlaceholder={size} textInputSize="small" aria-label="사이즈 입력" />
        </DetailItem>
        <DetailItem>
          <DetailTitleText aria-label="재질">재질</DetailTitleText>
          <TextInput textInputPlaceholder={texture} textInputSize="small" aria-label="재질 입력" />
        </DetailItem>
        <DetailItem>
          <DetailTitleText aria-label="계절감">계절감</DetailTitleText>
          <Select initItem={season} type="season" />
        </DetailItem>
      </DetailContainer>
      <DetailContainer>
        <TabText aria-label="메모">메모</TabText>
        <DetailItem>
          <TextArea textareaPlaceholder={memo} aria-label="메모 입력" />
        </DetailItem>
      </DetailContainer>
      <ButtonWrapper>
        <Button btnSize="large" btnColor="primary" onClick={handleSave} aria-label="수정 완료 버튼">
          수정 완료
        </Button>
      </ButtonWrapper>
    </ClothesEditPageContainer>
  );
};

export default ClothesEditPage;
