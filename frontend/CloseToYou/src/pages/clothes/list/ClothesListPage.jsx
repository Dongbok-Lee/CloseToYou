import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import {
  ClothesCardWrapper,
  ClothesListPageContainer,
  InfoWrapper,
  Nickname,
  NoClothesText,
  PageContainer,
  SwipeContainer,
  Title,
} from "./ClothesListPageStyle.js";
import FloatingButton from "../../../components/floatingbutton/FloatingButton.jsx";
import ClothesCard from "../../../components/clothescard/ClothesCard.jsx";
import FilterList from "../../../components/filter/list/FilterList.jsx";

import { useClothesStore } from "../../../stores/clothes.jsx";
import { filterLabels } from "../../../constants/filter.js"; // filterLabels를 import

const ClothesListPage = () => {
  const { clothesList, loadClothesList } = useClothesStore();
  const [clothes, setClothes] = useState([]);
  const [totalClothes, setTotalClothes] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lastTouchedIndex, setLastTouchedIndex] = useState(null);
  const listRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 활성화된 카드의 인덱스 복원
    const savedActiveIndex = localStorage.getItem("activeIndex");
    if (savedActiveIndex) {
      setActiveIndex(parseInt(savedActiveIndex, 10));
    }

    // 옷 목록 불러오기
    loadClothesList();
  }, [loadClothesList]);

  useEffect(() => {
    // 옷 목록이 업데이트될 때 상태값 설정
    console.log("클라이언트에서 받은 옷 데이터:", clothesList); // 받은 데이터 콘솔 로그
    const updatedClothes = clothesList.map(clothing => ({
      ...clothing,
      nickname:
        clothing.nickname ||
        `${filterLabels.color[clothing.color]} ${filterLabels.category[clothing.type]}`, // nickname이 없을 때 color + type 설정
      colorLabel: filterLabels.color[clothing.color], // color를 한글로 변환
      categoryLabel: filterLabels.category[clothing.type], // type을 한글로 변환
      patternLabel: filterLabels.pattern[clothing.pattern], // pattern을 한글로 변환
    }));
    setClothes(updatedClothes || []); // clothesList가 존재하지 않으면 빈 배열로 초기화
    setTotalClothes(Array.isArray(clothesList) ? clothesList.length : 0); // clothesList가 배열인지 확인
  }, [clothesList]);

  useEffect(() => {
    // 활성화된 카드 인덱스를 로컬 스토리지에 저장
    localStorage.setItem("activeIndex", activeIndex);

    // 카드가 변경될 때 스크롤 위치를 조정
    if (listRef.current && clothes.length > 0) {
      const container = listRef.current;
      const cardWidth = container.scrollWidth / clothes.length;
      container.scrollTo({
        left: cardWidth * activeIndex - container.offsetWidth / 2 + cardWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activeIndex, clothes]);

  const handleTouchDelete = () => {
    const updatedClothes = clothes.filter((_, index) => index !== activeIndex);
    setClothes(updatedClothes);
    setTotalClothes(updatedClothes.length);

    // 이전 카드가 활성화되도록 인덱스를 조정
    if (activeIndex > 0) {
      setActiveIndex(prevIndex => prevIndex - 1);
    } else {
      setActiveIndex(0); // 첫 번째 카드가 삭제될 경우 첫 번째 카드를 활성화
    }
  };

  const handleNext = () => {
    setActiveIndex(prevIndex => (prevIndex + 1) % clothes.length);
  };

  const handlePrev = () => {
    setActiveIndex(prevIndex => (prevIndex - 1 + clothes.length) % clothes.length);
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
        const middleIndex = Math.round(
          (container.scrollLeft + container.offsetWidth / 2 - 125) /
            (container.scrollWidth / clothes.length),
        );
        setActiveIndex(middleIndex % clothes.length);
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [clothes.length]);

  useEffect(() => {
    console.log(`Active card ID: ${clothes[activeIndex]?.clothesId}`);
  }, [activeIndex, clothes]);

  const handleTouchNfc = () => {
    navigate(`/clothes/nfc`);
  };

  const handleTouchClothesCard = (clothesId, index) => {
    if (index === activeIndex) {
      if (lastTouchedIndex === index) {
        navigate(`/clothes/${clothesId}`);
      } else {
        console.log(`Touched card ID: ${clothesId}`);
        setLastTouchedIndex(index);
      }
    }
  };

  return (
    <ClothesListPageContainer className="page">
      <PageContainer>
        <InfoWrapper>
          <FilterList isOpen={isFilterOpen} setIsOpen={setIsFilterOpen} />
          <Title>
            전체 옷 개수: <span>{totalClothes}</span>
          </Title>
        </InfoWrapper>
        {Array.isArray(clothes) && clothes.length === 0 ? (
          <NoClothesText>등록된 옷이 없습니다.</NoClothesText>
        ) : (
          <SwipeContainer {...handlers} id="clothes-list" ref={listRef}>
            {Array.isArray(clothes) &&
              clothes.map((clothing, index) => (
                <ClothesCardWrapper key={clothing.clothesId} isActive={index === activeIndex}>
                  <ClothesCard
                    handleTouchClothesCard={() => handleTouchClothesCard(clothing.clothesId, index)}
                    type={clothing.categoryLabel}
                    color={clothing.colorLabel}
                  />
                  <Nickname isActive={index === activeIndex}>{clothing.nickname}</Nickname>
                </ClothesCardWrapper>
              ))}
          </SwipeContainer>
        )}
        <FloatingButton type="delete" onTouchStart={handleTouchDelete}>
          Delete
        </FloatingButton>
        <FloatingButton type="nfc" onTouchStart={handleTouchNfc}>
          NFC
        </FloatingButton>
      </PageContainer>
    </ClothesListPageContainer>
  );
};

export default ClothesListPage;
