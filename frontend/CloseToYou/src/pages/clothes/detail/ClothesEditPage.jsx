import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ClothesEditPageContainer,
  ClothesName,
  Tab,
  DetailContainer,
  DetailItem,
  DetailTitle,
  ButtonWrapper,
  ImageContainer,
  LocationInputContainer,
  TextInputStyled,
} from './ClothesEditPageStyle';
import TextArea from '../../../components/textarea/Textarea';
import TextInput from '../../../components/textinput/TextInput';
import Button from '../../../components/button/Button';
import tempImage from '../../../assets/icons/temp-image.png';

const ClothesEditPage = () => {
  const [nickname, setNickname] = useState('산뜻 노랑');
  const [color, setColor] = useState('노랑');
  const [type, setType] = useState('셔츠');
  const [pattern, setPattern] = useState('무지');
  const [size, setSize] = useState('L');
  const [texture, setTexture] = useState('면');
  const [seasonFeeling, setSeasonFeeling] = useState('봄, 가을');
  const [memo, setMemo] = useState('산뜻한 봄에 피크닉 가고 싶을 때 입을 티셔츠');
  const [location, setLocation] = useState('A-14');


  const navigate = useNavigate();
  const { id = 0 } = useParams();

  const handleSave = () => {
    navigate(`/clothes/${id}`);
  };

  

  return (
    <ClothesEditPageContainer className="page">
      <ClothesName>
      <TextInput textInputPlaceholder={nickname} textInputSize="small" />
      </ClothesName>
      <ImageContainer>
        <img src={tempImage} alt="Clothes" />
      </ImageContainer>
      <LocationInputContainer>
        <TextInputStyled
          textInputPlaceholder={location}
          textInputSize="smaller"
          style={{ textAlign: 'center' }}
        />
      </LocationInputContainer>
      <DetailContainer>
        <Tab>기본 정보</Tab>
        <DetailItem>
          <DetailTitle>색상</DetailTitle>
          <select>
            <option value="red">빨간색</option>
            <option value="orange">주황색</option>
            <option value="yellow">노랑색</option>
            <option value="green">초록색</option>
            <option value="blue">파란색</option>
            <option value="navy">남색</option>
            <option value="purple">보라색</option>
            <option value="pink">분홍색</option>
            <option value="brown">갈색</option>
            <option value="black">검정색</option>
            <option value="gray">회색</option>
            <option value="white">흰색</option>
            <option value="beige">베이지색</option>
          </select>
        </DetailItem>
        <DetailItem>
          <DetailTitle>종류</DetailTitle>
          <select>
            <option value="blouse">블라우스</option>
            <option value="cardigan">가디건</option>
            <option value="coat">코트</option>
            <option value="jacket">재킷</option>
            <option value="jumper">점퍼</option>
            <option value="shirt">셔츠</option>
            <option value="sweater">스웨터</option>
            <option value="t-shirt">티셔츠</option>
            <option value="vest">조끼</option>
            <option value="bottom">하의</option>
            <option value="dress">원피스</option>
            <option value="jumpsuite">점프수트</option>
            <option value="skirt">치마</option>
            <option value="socks">양말</option>
          </select>
        </DetailItem>
        <DetailItem>
          <DetailTitle>패턴</DetailTitle>
          <select>
            <option value="stripe">스트라이프</option>
            <option value="check">체크무늬</option>
            <option value="dot">도트무늬</option>
            <option value="plants">식물</option>
            <option value="etc">기타</option>
          </select>
        </DetailItem>
      </DetailContainer>
      <DetailContainer>
        <Tab>추가 정보</Tab>
        <DetailItem>
          <DetailTitle>사이즈</DetailTitle>
          <TextInput textInputPlaceholder={size} textInputSize="small" />
        </DetailItem>
        <DetailItem>
          <DetailTitle>재질</DetailTitle>
          <TextInput textInputPlaceholder={texture} textInputSize="small" />
        </DetailItem>
        <DetailItem>
          <DetailTitle>계절감</DetailTitle>
          <select>
            <option value="spring">봄</option>
            <option value="summer">여름</option>
            <option value="autumn">가을</option>
            <option value="winter">겨울</option>
          </select>
        </DetailItem>
      </DetailContainer>
      <DetailContainer>
        <Tab>메모</Tab>
        <DetailItem>
          <TextArea textareaPlaceholder={memo} />
        </DetailItem>
      </DetailContainer>
      <ButtonWrapper>
        <Button btnSize="large" btnColor="primary" onClick={handleSave}>
          수정 완료
        </Button>
      </ButtonWrapper>
    </ClothesEditPageContainer>
  );
};

export default ClothesEditPage;
