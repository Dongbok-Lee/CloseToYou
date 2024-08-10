import { useState } from "react"
import { ClosetsPageContainer, ClosetTextWrapper,ClosetTextTitleWrapper, ClosetImg, ClosetText, SelectedText, ClosetSelectWrapper, ClosetButtonWrapper} from "./ClosetsPageStyle";

import ClosetsCardBasic from "../../assets/icons/etc/closet-card-basic.svg?react"
import ClosetsCardFocus from "../../assets/icons/etc/closet-card-focus.svg?react"
import Plus from "../../assets/icons/etc/plus-large.svg?react"
import Card from "../../components/card/Card"
import FloatingButton from "../../components/floatingbutton/FloatingButton"

const ClosetsPage = () => {

  const items = [{nickname: "여름옷 전용 옷장", closetCode: "1"}, {nickname: "가을옷 전용 옷장2", closetCode: "2"},{nickname: "봄옷 전용 옷장", closetCode: "3"},{nickname: "겨울옷 전용 옷장", closetCode: "4"}]

  const [ cardIndex, setCardIndex ] = useState("");

  const [ isOpenModal, setIsOpenModal ] = useState(false);
  const [ isDelete, setIsDelete ] = useState(false);
  const [ isModify, setIsModify ] = useState(false);
  const [ isAdd, setIsAdd ] = useState(false);

  const handleTouchCard = (index) => {
    setCardIndex(index);
  }

  const handleTouchDelete = () => {
    setIsOpenModal(true);
    setIsDelete(true);
  }

  const handleTouchModify = () => {
    setIsOpenModal(true);
    setIsModify(true);
  }

  return (
    <ClosetsPageContainer className="page">
      <ClosetTextWrapper>
        <ClosetTextTitleWrapper>
          <ClosetImg src="src/assets/icons/etc/closet.svg" alt="closet logo"></ClosetImg>
          <ClosetText>선택된 옷장</ClosetText>
        </ClosetTextTitleWrapper>
        {cardIndex !== "" ? <SelectedText>{items[cardIndex].nickname}</SelectedText> : <span></span>}
      </ClosetTextWrapper>
      <ClosetSelectWrapper>
          {items !== undefined && items.map((item, index) => (
              <Card
                key={index}
                handleTouch={() => handleTouchCard(index)}
                Icon={ClosetsCardBasic}
                FocusIcon={ClosetsCardFocus}
                tabIndex={0}
                isFocused={index == cardIndex}
              ></Card>
          ))}
          <Card Icon={Plus} tabIndex={0}></Card>
      </ClosetSelectWrapper>
      <ClosetButtonWrapper>
        <FloatingButton type="delete" onTouchStart={handleTouchDelete} ></FloatingButton>
        <FloatingButton type="edit" onTouchStart={handleTouchModify}></FloatingButton>
        {isOpenModal && isDelete && <Modal modalType="delete">삭제하기</Modal>}
        {isOpenModal && isModify && <Modal>수정하기</Modal>}
        {isOpenModal && isAdd && <Modal>추가하기</Modal>}
      </ClosetButtonWrapper>
    </ClosetsPageContainer>
  );
};

export default ClosetsPage;
