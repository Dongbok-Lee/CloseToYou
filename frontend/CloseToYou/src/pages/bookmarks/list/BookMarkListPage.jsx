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
import useBookmarkStore from "../../../stores/bookmark.jsx";
import Modal from "../../../components/modal/Modal.jsx";
import { useDoubleClick } from "../../../hooks/useDoubleClick.js";

const BookMarkListPage = () => {
  const [isOpenPlusModal, setIsOpenPlusModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState({ id: -1, nickname: "" });
  const [newNickname, setNewNickname] = useState("");
  const [isDoubleClick, updateTouchTime] = useDoubleClick();
  const {
    bookmarkList,
    loadBookmarkList,
    removeBookmark,
    addBookmark,
    editBookmark,
    loadBookmarkDetail,
  } = useBookmarkStore();
  const navigate = useNavigate();

  const handleTouchCard = bookmark => {
    updateTouchTime();
    if (isDoubleClick()) {
      handleDoubleClick();
    } else {
      setSelectedBookmark({ id: bookmark.bookmarkId, nickname: bookmark.nickname });
    }
  };

  const handleDoubleClick = async () => {
    if (selectedBookmark.id > -1) {
      await loadBookmarkDetail(selectedBookmark.id);
      navigate(`/bookmarks/${selectedBookmark.id}`);
    }
  };

  const handleTouchPlusCard = () => setIsOpenPlusModal(true);
  const handleTouchDeleteButton = () => selectedBookmark.id > -1 && setIsOpenDeleteModal(true);
  const handleTouchEditButton = () => selectedBookmark.id > -1 && setIsOpenEditModal(true);

  const handleKeyDown = e => {
    if (e.key === "Tab") {
      e.preventDefault();
      setSelectedBookmark(prev => {
        const currIndex = bookmarkList.findIndex(b => b.bookmarkId === prev.id);
        const nextIndex = (currIndex + 1) % bookmarkList.length;
        return {
          id: bookmarkList[nextIndex].bookmarkId,
          nickname: bookmarkList[nextIndex].nickname,
        };
      });
    }
  };

  useEffect(() => {
    loadBookmarkList();
    const handleKeyDownWrapper = e => handleKeyDown(e);
    window.addEventListener("keydown", handleKeyDownWrapper);

    return () => {
      window.removeEventListener("keydown", handleKeyDownWrapper);
    };
  }, [bookmarkList]);

  useEffect(() => {
    loadBookmarkList();
  }, [newNickname]);

  return (
    <BookMarkListPageContainer className="page">
      {isOpenDeleteModal && (
        <Modal
          modalType="delete"
          setIsOpenModal={setIsOpenDeleteModal}
          handleTouchConfirmButton={async () => {
            await removeBookmark(selectedBookmark.id);
            setSelectedBookmark({ id: -1, nickname: "" });
          }}
        >
          확인
        </Modal>
      )}
      {isOpenPlusModal && (
        <Modal
          firstPlaceholder="새로운 코디 이름"
          setFirstValue={setNewNickname}
          setIsOpenModal={setIsOpenPlusModal}
          handleTouchConfirmButton={async () => {
            await addBookmark(newNickname);
            setNewNickname("");
          }}
        >
          확인
        </Modal>
      )}
      {isOpenEditModal && (
        <Modal
          firstPlaceholder={selectedBookmark.nickname}
          setFirstValue={setNewNickname}
          setIsOpenModal={setIsOpenEditModal}
          handleTouchConfirmButton={async () => {
            await editBookmark(selectedBookmark.id, newNickname);
            setNewNickname("");
          }}
        >
          확인
        </Modal>
      )}
      <TextWrapper>
        <TitleText>
          <HangerBlack title="옷걸이 아이콘" />
          선택된 코디
        </TitleText>
        <SelectedText>
          {selectedBookmark.id > -1 ? selectedBookmark.nickname : "선택된 코디 없음"}
        </SelectedText>
      </TextWrapper>
      <CardListWrapper>
        {bookmarkList.map(bookmark => (
          <Card
            key={bookmark.bookmarkId}
            handleTouch={() => handleTouchCard(bookmark)}
            Icon={BookMarkedClothesBasic}
            FocusIcon={BookMarkedClothesFocus}
            isFocused={bookmark.bookmarkId === selectedBookmark.id}
          />
        ))}
        <Card handleTouch={handleTouchPlusCard} Icon={Plus} />
      </CardListWrapper>
      <FloatingButtonWraper>
        <FloatingButton type="delete" onTouchStart={handleTouchDeleteButton} />
        <FloatingButton type="edit" onTouchStart={handleTouchEditButton} />
      </FloatingButtonWraper>
    </BookMarkListPageContainer>
  );
};

export default BookMarkListPage;
