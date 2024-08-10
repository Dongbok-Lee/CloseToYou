import {CloseImg, CloseImgBox, ContentWrapper, DeleteText, TextInputWrapper, ModalContainer, ModalWrapper, TextBox} from "./ModalStyle"
import TextInput from "../textinput/TextInput";
import Button from "../button/Button";

const Modal = ({
    modalType,
    modalSize,
    firstPlaceholder,
    secondPlaceholder,
    setIsOpenModal,
    setFirstValue,
    setSecondValue,
    children
}) => {

    const deleteMessage = "정말 삭제하시겠습니까?";

    const handleChangeFirstValue = (e) => {
      setFirstValue(e.target.value);
    }

    const handleChangeSecondValue = (e) => {
      setSecondValue(e.target.value)
    }

    const handleTouchClose = () => {
      e.target.focus();

      setTimeout(() => {
        setIsOpenModal(false);
      }, 100)
    }

    const handleTouchButton = (e) => {
      e.target.focus();

      setTimeout(() => {
        setIsOpenModal(false);
      }, 100)
    }

    return(
            <ModalContainer>
                <ModalWrapper size={modalSize}>
                    <CloseImgBox>
                        <CloseImg src="src/assets/icons/etc/close-button.svg" onTouchStart={handleTouchClose} tabIndex={0}></CloseImg>
                    </CloseImgBox>
                    <ContentWrapper>
                        {modalType === "delete" ?
                        <TextBox>
                            <DeleteText>{deleteMessage}</DeleteText>
                        </TextBox>
                        :
                        <TextInputWrapper>
                            {modalSize !== "" &&
                                <TextInput textInputPlaceholder={firstPlaceholder} handleChangeTextInput={handleChangeFirstValue}></TextInput>
                            }
                            {modalSize === "large" &&
                                <TextInput textInputPlaceholder={secondPlaceholder} handleChangeTextInput={handleChangeSecondValue}></TextInput>
                            }
                        </TextInputWrapper>
                        }
                        <Button handleTouchButton={handleTouchButton}>{children}</Button>
                    </ContentWrapper>
                </ModalWrapper>
            </ModalContainer>       
    );
}

export default Modal;
