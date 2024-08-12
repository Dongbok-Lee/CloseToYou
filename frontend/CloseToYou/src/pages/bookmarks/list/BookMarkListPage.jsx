import {
  BookMarkListPageContainer,
  CardListWrapper,
  FloatingButtonWraper,
  SelectedText,
  TextWrapper,
  TitleText,
} from "./BookMarkListPageStyle";
import HangerBlack from "../../../assets/icons/etc/hanger-black.svg?react";
import Plus from "../../../assets/icons/etc/plus-large.svg?react";
import BookMarkedClothesBasic from "../../../assets/icons/etc/bookmarked-clothes-basic.svg?react";
import BookMarkedClothesFocus from "../../../assets/icons/etc/bookmarked-clothes-focus.svg?react";
import { useEffect, useState } from "react";
import Card from "../../../components/card/Card.jsx";
import FloatingButton from "../../../components/floatingbutton/FloatingButton.jsx";
import { useNavigate } from "react-router-dom";
import { useDoubleClick } from "../../../hooks/useDoubleClick.js";
import useBookmarkStore from "../../../stores/bookmark.jsx";

const BookMarkListPage = () => {
  const [isDoubleClick, updateTouchTime] = useDoubleClick();
  const [selectedBookmark, setSelectedBookmark] = useState({
    id: -1,
    nickname: "",
  });

  const bookmarkList = useBookmarkStore(state => state.bookmarkList);
  const loadBookmarkList = useBookmarkStore(state => state.loadBookmarkList);

  const navigate = useNavigate();

  const handleTouchCard = bookmark => {
    updateTouchTime();

    if (isDoubleClick()) {
      handleDoubleClick();
    } else {
      setSelectedBookmark({
        ...selectedBookmark,
        id: bookmark.bookmarkId,
        nickname: bookmark.nickname,
      });
    }
  };

  const handleDoubleClick = () => {
    selectedBookmark.id > -1 && navigate(`/bookmarks/${selectedBookmark.id}`);
  };

  const handleTouchPlusCard = () => {
    // TODO: 모달창 열기
  };

  const handleKeyDown = e => {
    if (e.key === "Tab") {
      e.preventDefault(); // 기본 탭 동작 방지
      setSelectedBookmark({
        ...selectedBookmark,
        id: prevIndex => (prevIndex + 1) % bookmarkList.length,
      });
    }
  };

  useEffect(() => {
    loadBookmarkList();
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <BookMarkListPageContainer className="page">
      <TextWrapper>
        <TitleText>
          <HangerBlack title="옷걸이 아이콘" />
          선택된 코디
        </TitleText>
        <SelectedText>{selectedBookmark.id > -1 && selectedBookmark.nickname}</SelectedText>
      </TextWrapper>

      <CardListWrapper>
        {Object.values(bookmarkList).map((bookmark, index) => (
          <Card
            key={index}
            handleTouch={() => handleTouchCard(bookmark)}
            handleDoubleClick={handleDoubleClick}
            Icon={BookMarkedClothesBasic}
            FocusIcon={BookMarkedClothesFocus}
            isFocused={index === selectedBookmark.id}
          />
        ))}
        {/*TODO: PlusCard 컴포넌트 만들기*/}
        <Card handleTouch={handleTouchPlusCard} Icon={Plus} />
      </CardListWrapper>

      <FloatingButtonWraper>
        <FloatingButton type="delete" />
        <FloatingButton type="add" />
      </FloatingButtonWraper>
    </BookMarkListPageContainer>
  );
};

export default BookMarkListPage;
