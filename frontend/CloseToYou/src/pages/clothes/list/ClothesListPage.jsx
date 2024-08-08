import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import {
  ClothesListPageContainer,
  PageContainer,
  Filters,
  Nickname,
  FilterSelect,
  Title,
  SwipeContainer,
  NoClothesText,
  FixedContainer,
  ClothesCardWrapper,
} from './ClothesListPageStyle';
import FloatingButton from '../../../components/floatingbutton/FloatingButton';
import ClothesCard from '../../../components/clothescard/ClothesCard';

const ClothesListPage = () => {
  const [clothes, setClothes] = useState([
    {
      id: 0,
      nickname: '산뜻 노랑',
      imageUrl: 'https://via.placeholder.com/150',
      color: 'yellow',
      type: 'shirt',
      pattern: '무지',
    },
    {
      id: 1,
      nickname: '시원한 블루',
      imageUrl: 'https://via.placeholder.com/150',
      color: 'blue',
      type: 'shirt',
      pattern: '체크',
    },
    {
      id: 2,
      nickname: '따뜻한 레드',
      imageUrl: 'https://via.placeholder.com/150',
      color: 'red',
      type: 'coat',
      pattern: '무지',
    },
    {
      id: 3,
      nickname: '부드러운 그린',
      imageUrl: 'https://via.placeholder.com/150',
      color: 'green',
      type: 'cardigan',
      pattern: '무지',
    },
    {
      id: 4,
      nickname: '클래식 블랙',
      imageUrl: 'https://via.placeholder.com/150',
      color: 'black',
      type: 'jacket',
      pattern: '무지',
    },
  ]);

  const [totalClothes, setTotalClothes] = useState(clothes.length);
  const [filters, setFilters] = useState({
    color: '',
    type: '',
    pattern: '',
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [lastTouchedIndex, setLastTouchedIndex] = useState(null);
  const listRef = useRef(null);

  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    const filteredClothes = clothes.filter((clothing) =>
      Object.keys(filters).every((key) => !filters[key] || clothing[key] === filters[key])
    );
    setTotalClothes(filteredClothes.length);
  };

  const handleDelete = () => {
    const updatedClothes = clothes.filter((_, index) => index !== activeIndex);
    setClothes(updatedClothes);
    setTotalClothes(updatedClothes.length);
    setActiveIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % clothes.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + clothes.length) % clothes.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container) {
        const middleIndex = Math.round((container.scrollLeft + container.offsetWidth / 2 - 125) / (container.scrollWidth / clothes.length));
        setActiveIndex(middleIndex % clothes.length);
      }
    };

    container.addEventListener('scroll', handleScroll);

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [clothes.length]);

  useEffect(() => {
    console.log(`Active card ID: ${clothes[activeIndex]?.id}`);
  }, [activeIndex, clothes]);

  const handleAdd = () => {
    navigate(`/clothes/${clothes[activeIndex]?.id}`);
  };

  const handleTouchClothesCard = (id, index) => {
    if (index === activeIndex) {
      if (lastTouchedIndex === index) {
        navigate(`/clothes/${id}`);
      } else {
        console.log(`Touched card ID: ${id}`);
        setLastTouchedIndex(index);
      }
    }
  };

  return (
    <ClothesListPageContainer className="page">
      <PageContainer>
        <Title>
          전체 옷 개수: <span>{totalClothes}</span>
        </Title>
        <Filters>
          <FilterSelect name="color" onChange={handleFilterChange}>
            <option value="">색상</option>
            <option value="red">빨간색</option>
            <option value="orange">주황색</option>
            <option value="yellow">노란색</option>
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
          </FilterSelect>
          <FilterSelect name="type" onChange={handleFilterChange}>
            <option value="">종류</option>
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
          </FilterSelect>
          <FilterSelect name="pattern" onChange={handleFilterChange}>
            <option value="">패턴</option>
            <option value="check">체크무늬</option>
            <option value="dot">도트무늬</option>
            <option value="etc">기타</option>
            <option value="plants">식물</option>
            <option value="stripe">스트라이프</option>
          </FilterSelect>
        </Filters>
        {clothes.length === 0 ? (
          <NoClothesText>등록된 옷이 없습니다.</NoClothesText>
        ) : (
          <SwipeContainer
            {...handlers}
            id="clothes-list"
            ref={listRef}
          >
            {clothes.map((clothing, index) => (
              <ClothesCardWrapper key={index} isActive={index === activeIndex}>
                <ClothesCard
                  handleTouchClothesCard={() => handleTouchClothesCard(clothing.id, index)}
                  type={clothing.type}
                  color={clothing.color}
                />
                <Nickname isActive={index === activeIndex}>{clothing.nickname}</Nickname>
              </ClothesCardWrapper>
            ))}
          </SwipeContainer>
        )}
        <FixedContainer>
          <FloatingButton type="delete" handleClick={handleDelete}>
            Delete
          </FloatingButton>
          <FloatingButton type="nfc" handleClick={handleAdd}>
            NFC
          </FloatingButton>
        </FixedContainer>
      </PageContainer>
    </ClothesListPageContainer>
  );
};

export default ClothesListPage;
