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
import { useState, useEffect, useCallback } from "react";
import Card from "../../../components/card/Card.jsx";
import FloatingButton from "../../../components/floatingbutton/FloatingButton.jsx";
import { useNavigate } from "react-router-dom";
import { useDoubleClick } from "../../../hooks/useDoubleClick.js";

const BookMarkListPage = () => {
  const [bookMarkIndex, setBookMarkIndex] = useState(-1);
  const [isDoubleClick, updateTouchTime] = useDoubleClick();

  const navigate = useNavigate();

  const handleTouchCard = id => {
    updateTouchTime();

    if (isDoubleClick()) {
      handleDoubleClick();
    } else {
      setBookMarkIndex(id);
    }
  };

  const handleDoubleClick = () => {
    bookMarkIndex > -1 && navigate(`/bookmarks/${bookMarkIndex}`);
  };

  const handleTouchPlusCard = () => {
    // TODO: 모달창 열기
  };

  const handleKeyDown = e => {
    if (e.key === "Tab") {
      e.preventDefault(); // 기본 탭 동작 방지
      setBookMarkIndex(prevIndex => (prevIndex + 1) % cards.length);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const cards = [
    {
      bookmarkId: 0,
      nickname: "데이트 코디",
    },
    {
      bookmarkId: 1,
      nickname: "여름 축제 코디",
    },
    {
      bookmarkId: 2,
      nickname: "출근할 때 무난한 코디",
    },
    {
      bookmarkId: 3,
      nickname: "장마 코디",
    },

    {
      bookmarkId: 4,
      nickname: "결혼식 갈 때 입는 옷",
    },
  ];

  return (
    <BookMarkListPageContainer className="page">
      <TextWrapper>
        <TitleText>
          <HangerBlack title="옷걸이 아이콘" />
          선택된 코디
        </TitleText>
        <SelectedText>{bookMarkIndex > -1 && cards[bookMarkIndex].nickname}</SelectedText>
      </TextWrapper>

      <CardListWrapper>
        {cards.map((card, index) => (
          <Card
            key={index}
            handleTouch={() => handleTouchCard(card.bookmarkId)}
            handleDoubleClick={handleDoubleClick}
            Icon={BookMarkedClothesBasic}
            FocusIcon={BookMarkedClothesFocus}
            isFocused={index === bookMarkIndex}
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
