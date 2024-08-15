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
} from "./ClothesListPageStyle";
import FloatingButton from "../../../components/floatingbutton/FloatingButton";
import ClothesCard from "../../../components/clothescard/ClothesCard";
import FilterList from "../../../components/filter/list/FilterList.jsx";
import useClothesStore from "../../../stores/clothes"; // zustand store import
import { filterLabels } from "../../../constants/filter"; // filterLabels import

const ClothesListPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lastTouchedIndex, setLastTouchedIndex] = useState(null);
  const listRef = useRef(null);

  const navigate = useNavigate();
  const { clothes, loadClothesList, removeClothesItem, setFocusedClothesId } = useClothesStore();

  const handleTouchDelete = async () => {
    const activeClothesId = clothes[activeIndex]?.clothesId;
    if (activeClothesId) {
      await removeClothesItem(activeClothesId);
      await loadClothesList(); // 옷 삭제 후 옷 목록 다시 로드
      setActiveIndex(prevIndex => Math.max(prevIndex - 1, 0)); // 삭제 후 인덱스 조정
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
    loadClothesList();
  }, [location]);

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
  }, [listRef.current]);

  useEffect(() => {
    console.log(`Active card ID: ${clothes[activeIndex]?.clothesId}`);
  }, [activeIndex, clothes]);

  const handleTouchNfc = () => {
    const activeClothesId = clothes[activeIndex]?.clothesId;
    if (activeClothesId) {
      setFocusedClothesId(activeClothesId);
    }
    navigate(`/clothes/nfc`);
  };

  const handleTouchClothesCard = (id, index) => {
    if (index === activeIndex) {
      if (lastTouchedIndex === index) {
        navigate(`/clothes/${id}`);
      } else {
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
            전체 옷 개수: <span>{clothes.length}</span>
          </Title>
        </InfoWrapper>
        {clothes.length === 0 ? (
          <NoClothesText>등록된 옷이 없습니다.</NoClothesText>
        ) : (
          <SwipeContainer {...handlers} id="clothes-list" ref={listRef}>
            {clothes.map((clothing, index) => {
              const colorInKorean = filterLabels.color[clothing.color] || clothing.color;
              const typeInKorean = filterLabels.category[clothing.type] || clothing.type;

              return (
                <ClothesCardWrapper key={clothing.clothesId} isActive={index === activeIndex}>
                  <ClothesCard
                    handleTouchClothesCard={() => handleTouchClothesCard(clothing.clothesId, index)}
                    type={clothing.type}
                    color={clothing.color}
                  />
                  <Nickname>
                    {clothing.nickname ? clothing.nickname : `${colorInKorean} ${typeInKorean}`}
                  </Nickname>
                </ClothesCardWrapper>
              );
            })}
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
