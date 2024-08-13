import { useState, useEffect } from "react";
import {
  ClosetsPageContainer,
  ClosetTextWrapper,
  ClosetTextTitleWrapper,
  ClosetImg,
  ClosetText,
  SelectedText,
  ClosetSelectWrapper,
  ClosetButtonWrapper,
} from "./ClosetsPageStyle";

import ClosetsCardBasic from "../../assets/icons/etc/closet-card-basic.svg?react";
import ClosetsCardFocus from "../../assets/icons/etc/closet-card-focus.svg?react";
import Plus from "../../assets/icons/etc/plus-large.svg?react";
import Card from "../../components/card/Card";
import FloatingButton from "../../components/floatingbutton/FloatingButton";
import Modal from "../../components/modal/Modal";

import { useDoubleClick } from "../../hooks/useDoubleClick";
import { useClosetsStore } from "../../stores/closet";
import { placeholder } from "../../constants/placeholder";

import { useNavigate } from "react-router-dom";
const ClosetsPage = () => {
  const { loadClosets, addClosets, removeClosets, editClosets, closets } = useClosetsStore();

  const [isDoubleClick, updateTouchTime] = useDoubleClick();

  const [nickname, setNickname] = useState("");
  const [closetCode, setClosetCode] = useState("");
  const [cardIndex, setCardIndex] = useState("");

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isModify, setIsModify] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    loadClosets();
  }, []);

  useEffect(() => {
    if (!isOpenModal) {
      if (isDelete) {
        setIsDelete(false);

        setTimeout(() => {
          removeClosets(closets[cardIndex].closetId);
        }, 100);
      }

      if (isModify) {
        setIsModify(false);

        setTimeout(() => {
          editClosets(closets[cardIndex].closetId, nickname);
        }, 100);
      }

      if (isAdd) {
        setIsAdd(false);

        setTimeout(() => {
          addClosets(nickname, closetCode);
        }, 100);
      }
    }
  }, [isOpenModal, closets]);

  const handleTouchCard = index => {
    setCardIndex(index);

    if (isDoubleClick()) {
      nav(`/closets/${closets[cardIndex].closetId}`);
    } else {
      updateTouchTime();
    }
  };

  const handleTouchAdd = async e => {
    e.target.focus();

    setIsAdd(true);
    setIsOpenModal(true);
  };

  const handleTouchDelete = e => {
    e.target.focus();

    console.log(cardIndex);
    console.log(closets[cardIndex].closetId);

    setIsOpenModal(true);
    setIsDelete(true);
  };

  const handleTouchModify = e => {
    e.target.focus();

    setIsOpenModal(true);
    setIsModify(true);
  };

  return (
    <ClosetsPageContainer className="page">
      <ClosetTextWrapper>
        <ClosetTextTitleWrapper>
          <ClosetImg src="src/assets/icons/etc/closet.svg" alt="closet logo"></ClosetImg>
          <ClosetText>선택된 옷장</ClosetText>
        </ClosetTextTitleWrapper>
        {cardIndex !== "" ? (
          <SelectedText>{closets[cardIndex].nickname}</SelectedText>
        ) : (
          <span></span>
        )}
      </ClosetTextWrapper>
      <ClosetSelectWrapper>
        {closets !== undefined &&
          closets.map((item, index) => (
            <Card
              key={index}
              handleTouch={() => handleTouchCard(index)}
              Icon={ClosetsCardBasic}
              FocusIcon={ClosetsCardFocus}
              tabIndex={0}
              isFocused={index == cardIndex}
            ></Card>
          ))}
        <Card Icon={Plus} tabIndex={0} handleTouch={handleTouchAdd}></Card>
      </ClosetSelectWrapper>
      <ClosetButtonWrapper>
        <FloatingButton type="delete" onTouchStart={handleTouchDelete}></FloatingButton>
        <FloatingButton type="edit" onTouchStart={handleTouchModify}></FloatingButton>
        {isOpenModal && isDelete && (
          <Modal modalType="delete" setIsOpenModal={setIsOpenModal}>
            삭제하기
          </Modal>
        )}
        {isOpenModal && isModify && (
          <Modal
            firstPlaceholder={placeholder.newClosetNickname}
            setFirstValue={setNickname}
            setIsOpenModal={setIsOpenModal}
          >
            수정하기
          </Modal>
        )}
        {isOpenModal && isAdd && (
          <Modal
            firstPlaceholder={placeholder.closetNickname}
            secondPlaceholder={placeholder.closetCode}
            setFirstValue={setNickname}
            setSecondValue={setClosetCode}
            modalSize="large"
            setIsOpenModal={setIsOpenModal}
          >
            추가하기
          </Modal>
        )}
      </ClosetButtonWrapper>
    </ClosetsPageContainer>
  );
};

export default ClosetsPage;
