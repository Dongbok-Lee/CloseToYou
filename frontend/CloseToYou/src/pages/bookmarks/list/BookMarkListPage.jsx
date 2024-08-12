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
import {useEffect, useState} from "react";
import Card from "../../../components/card/Card.jsx";
import FloatingButton from "../../../components/floatingbutton/FloatingButton.jsx";
import {useNavigate} from "react-router-dom";
import {useDoubleClick} from "../../../hooks/useDoubleClick.js";
import useBookmarkStore from "../../../stores/bookmark.jsx";
import Modal from "../../../components/modal/Modal.jsx";

const BookMarkListPage = () => {
    const [isOpenPlusModal, setIsOpenPlusModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);

    const [newBookmarkNickname, setNewBookmarkNickname] = useState("");

    const [isDoubleClick, updateTouchTime] = useDoubleClick();
    const [selectedBookmark, setSelectedBookmark] = useState({
        id: -1,
        nickname: "",
    });

    const bookmarkList = useBookmarkStore(state => state.bookmarkList);
    const loadBookmarkList = useBookmarkStore(state => state.loadBookmarkList);
    const removeBookmark = useBookmarkStore(state => state.removeBookmark);
    const addBookmark = useBookmarkStore(state => state.addBookmark)

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
        setIsOpenPlusModal(true)
    };

    const handleTouchDeleteButton = () => {
        selectedBookmark.id > -1 && setIsOpenDeleteModal(true);
    }

    const handleTouchEditButton = () => {
        setIsOpenEditModdal(true);
    }

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
        // TODO: 지우기
        // Cookies.set(
        //     "access_token",
        //     "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcyMzQ3NTMxMCwiZW1haWwiOiJocmIuaGFycGVyQGdtYWlsLmNvbSIsImlkIjoxM30.3-S0wd66ID9HMgLmpBBeEJUgSSDwOKYzzyWfKQh8NfCxYvGEW7u9eXE9nLlL6OQUHEqBNHZspnNhCYKMiaW79Q",
        // );
        // Cookies.set(
        //     "refresh_token",
        //     "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MjQ2ODEzMTAsImVtYWlsIjoiaHJiLmhhcnBlckBnbWFpbC5jb20iLCJpZCI6MTN9.6fbH3VhoLpBldAsKneZYAorpQ7X9BoDioKe369-_C_F5LJQcKnWrs3EUHka24jXfnh4z8wFsoEREWojD9cUGiQ",
        // );
        loadBookmarkList();
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        loadBookmarkList();
    }, [bookmarkList]);

    return (
        <BookMarkListPageContainer className="page">
            {isOpenDeleteModal && <Modal modalType="delete" setIsOpenModal={setIsOpenDeleteModal} children="확인"
                                         handleTouchConfirmButton={async () => {
                                             await removeBookmark(selectedBookmark.id)
                                         }}/>}
            {isOpenPlusModal &&
                <Modal modalType="plus" setIsOpenModal={setIsOpenPlusModal} firstPlaceholder="새로운 코디 이름"
                       setFirstValue={setNewBookmarkNickname} children="확인"
                       handleTouchConfirmButton={async () => {
                           await addBookmark(newBookmarkNickname)
                       }}/>}
            <TextWrapper>
                <TitleText>
                    <HangerBlack title="옷걸이 아이콘"/>
                    선택된 코디
                </TitleText>
                <SelectedText>{selectedBookmark.id > -1 && selectedBookmark.nickname}</SelectedText>
            </TextWrapper>
            {/*TODO: UI 수정*/}
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
                <Card handleTouch={handleTouchPlusCard} Icon={Plus}/>
            </CardListWrapper>

            {/*TODO: floating button 동작*/}
            <FloatingButtonWraper>
                <FloatingButton type="delete" onTouchStart={handleTouchDeleteButton}/>
                <FloatingButton type="edit" onTouchStart={handleTouchEditButton}/>
            </FloatingButtonWraper>
        </BookMarkListPageContainer>
    );
};

export default BookMarkListPage;
