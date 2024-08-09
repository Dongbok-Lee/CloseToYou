import { useState } from "react"
import { ClosetsPageContainer, ClosetTextWrapper,ClosetTextTitleWrapper, ClosetImg, ClosetText, SelectedText, ClosetSelectWrapper, ClosetButtonWrapper} from "./ClosetsPageStyle";

import Card from "../../components/card/Card"
import FloatingButton from "../../components/floatingbutton/FloatingButton"

const ClosetsPage = () => {

  const items = [{nickname: "여름옷 전용 옷장", closetCode: "1"}, {nickname: "가을옷 전용 옷장2", closetCode: "2"},{nickname: "봄옷 전용 옷장", closetCode: "3"},{nickname: "겨울옷 전용 옷장", closetCode: "4"}]

  const [ selectedCloset, setSelectedCloset ] = useState("");
  const [ isOpenModal, setIsOpenModal ] = useState(false);
  const [ isDelete, setIsDelete ] = useState(false);
  const [ isModify, setIsModify ] = useState(false);
  const [ isAdd, setIsAdd ] = useState(false);

  return (
    <ClosetsPageContainer className="page">
      <ClosetTextWrapper>
        <ClosetTextTitleWrapper>
          <ClosetImg src="src/assets/icons/etc/closet.svg" alt="closet logo"></ClosetImg>
          <ClosetText>선택된 옷장</ClosetText>
        </ClosetTextTitleWrapper>
        {selectedCloset !== "" ? <SelectedText>{selectedCloset}</SelectedText> : <span></span>}
      </ClosetTextWrapper>
      <ClosetSelectWrapper>
          {items !== undefined && items.map((item, index) => (
              <Card cardType="basic" key={ index + 1 } tabIndex={0}></Card>
          ))}
          <Card></Card>
      </ClosetSelectWrapper>
      <ClosetButtonWrapper>
        <FloatingButton type="delete" ></FloatingButton>
        <FloatingButton type="edit"></FloatingButton>
        {isOpenModal && isDelete && <Modal>삭제하기</Modal>}
        {isOpenModal && isModify && <Modal>수정하기</Modal>}
        {isOpenModal && isAdd && <Modal>추가하기</Modal>}
      </ClosetButtonWrapper>
    </ClosetsPageContainer>
  );
};

export default ClosetsPage;
