import {
  BookMarkDetailPageContainer,
  BookmarkNickname,
  CardNickname,
} from "./BookMarkDetailPageStyle";
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDoubleClick } from "../../../hooks/useDoubleClick.js";

const BookMarkDetailPage = () => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedClothesId, setSelectedClothesId] = useState(-1);
  const [isDoubleClick, updateTouchTime] = useDoubleClick();

  const { bookmark, loadBookmarkDetail, removeClothesInBookmark } = useBookmarkStore();
  const listRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleTouchClothesCard = () => {
    if (isDoubleClick()) {
      navigate("/clothes/" + Object.values(bookmark.clothes)[activeIndex].clothesId);
    } else {
      updateTouchTime();
      setSelectedClothesId(Object.values(bookmark.clothes)[activeIndex]);
    }
  };

  const handleNext = () => {
    setActiveIndex(prevIndex => (prevIndex + 1) % bookmark.clothes.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      prevIndex =>
        (prevIndex - 1 + Object.values(bookmark.clothes).length) %
        Object.values(bookmark.clothes).length,
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
            (container.scrollWidth / Object.values(bookmark.clothes).length),
        );
        setActiveIndex(middleIndex % Object.values(bookmark.clothes).length);
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [[bookmark.clothes].length]);

  return (
    <BookMarkDetailPageContainer className="page">
      <BookmarkNickname>{bookmark.nickname}</BookmarkNickname>
      {isOpenDeleteModal && (
        <Modal
          modalType="delete"
          setIsOpenModal={setIsOpenDeleteModal}
          handleTouchConfirmButton={async () => {
            await removeClothesInBookmark(
              bookmark.bookmarkId,
              Object.values(bookmark.clothes)[activeIndex].clothesId,
            );
          }}
        >
          획인
        </Modal>
      )}
      {Object.values(bookmark.clothes).length === 0 ? (
        <NoClothesText>등록된 옷이 없습니다.</NoClothesText>
      ) : (
        <SwipeContainer {...handlers} id="clothes-list" ref={listRef}>
          {bookmark.clothes.map((clothing, index) => {
            console.log(clothing);
            return (
              <ClothesCardWrapper key={clothing.clothesId} isActive={index === activeIndex}>
                <ClothesCard
                  handleTouchClothesCard={handleTouchClothesCard}
                  type={clothing.type.toLowerCase()}
                  color={clothing.color.toLowerCase()}
                />
                <CardNickname isActive={index === activeIndex}>{clothing.nickname}</CardNickname>
              </ClothesCardWrapper>
            );
          })}
        </SwipeContainer>
      )}
      <FloatingButtonWraper>
        <FloatingButton type="delete" onTouchStart={() => setIsOpenDeleteModal(true)} />
        <FloatingButton
          type="add"
          onTouchStart={() => {
            navigate("/clothes/nfc");
          }}
        />
      </FloatingButtonWraper>
    </BookMarkDetailPageContainer>
  );
};

export default BookMarkDetailPage;
