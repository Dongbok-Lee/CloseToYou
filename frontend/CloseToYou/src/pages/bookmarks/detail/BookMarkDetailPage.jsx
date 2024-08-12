import { BookMarkDetailPageContainer } from "./BookMarkDetailPageStyle";
import { useEffect, useRef, useState } from "react";
import useBookmarkStore from "../../../stores/bookmark.jsx";
import FloatingButton from "../../../components/floatingbutton/FloatingButton.jsx";
import { FloatingButtonWraper } from "../list/BookMarkListPageStyle.js";
import Modal from "../../../components/modal/Modal.jsx";
import {
  ClothesCardWrapper,
  Nickname,
  NoClothesText,
  SwipeContainer,
} from "../../clothes/list/ClothesListPageStyle.js";
import ClothesCard from "../../../components/clothescard/ClothesCard.jsx";
import { useSwipeable } from "react-swipeable";
import { useLocation, useNavigate } from "react-router-dom";

const BookMarkDetailPage = () => {
  const { bookmark, loadBookmarkDetail, removeClothesInBookmark } = useBookmarkStore();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const listRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleTouchDeleteButton = () => {};

  const handleTouchAddButton = () => {
    navigate("/clothes/nfc");
  };

  const handleNext = () => {
    setActiveIndex(prevIndex => (prevIndex + 1) % bookmark.clothes.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      prevIndex => (prevIndex - 1 + bookmark.clothes.length) % bookmark.clothes.length,
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useEffect(() => {
    loadBookmarkDetail(location.pathname.split("/")[2]);
  }, []);

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container) {
        const middleIndex = Math.round(
          (container.scrollLeft + container.offsetWidth / 2 - 125) /
            (container.scrollWidth / bookmark.clothes.length),
        );
        setActiveIndex(middleIndex % bookmark.clothes.length);
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [bookmark.clothes.length]);

  return (
    <BookMarkDetailPageContainer className="page">
      {isOpenDeleteModal && (
        <Modal
          modalType="delete"
          setIsOpenModal={setIsOpenDeleteModal}
          handleTouchConfirmButton={async () => {
            await removeClothesInBookmark();
          }}
        >
          획인
        </Modal>
      )}
      {bookmark.clothes.length === 0 ? (
        <NoClothesText>등록된 옷이 없습니다.</NoClothesText>
      ) : (
        <SwipeContainer {...handlers} id="clothes-list" ref={listRef}>
          {bookmark.clothes.map((clothing, index) => (
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
      <FloatingButtonWraper>
        <FloatingButton type="delete" onTouchStart={handleTouchDeleteButton} />
        <FloatingButton type="plus" onTouchStart={handleTouchAddButton} />
      </FloatingButtonWraper>
    </BookMarkDetailPageContainer>
  );
};

export default BookMarkDetailPage;
