import {
    CloseImg,
    CloseImgBox,
    ContentWrapper,
    DeleteText,
    ModalContainer,
    ModalWrapper,
    TextBox,
    TextInputWrapper,
} from "./ModalStyle";
import TextInput from "../textinput/TextInput";
import Button from "../button/Button";
import {useEffect} from "react";

const Modal = ({
                   modalType,
                   modalSize,
                   firstPlaceholder,
                   secondPlaceholder,
                   setIsOpenModal,
                   setFirstValue,
                   setSecondValue,
                   handleTouchConfirmButton,
                   children,
               }) => {
    const deleteMessage = "정말 삭제하시겠습니까?";

    useEffect(() => {
        // Lock background scroll
        document.body.style.overflow = "hidden";
        return () => {
            // Unlock background scroll on unmount
            document.body.style.overflow = "unset";
        };
    }, []);

    const handleChangeFirstValue = e => {
        setFirstValue(e.target.value);
    };

    const handleChangeSecondValue = e => {
        setSecondValue(e.target.value);
    };

    const handleTouchClose = e => {
        e.target.focus();
        setTimeout(() => {
            setIsOpenModal(false);
        }, 100);
    };

    const handleTouchButton = e => {
        e.target.focus();
        handleTouchConfirmButton();
        setTimeout(() => {
            setIsOpenModal(false);
        }, 100);
    };

    return (
        <ModalContainer>
            <ModalWrapper size={modalSize} role="dialog" aria-labelledby="modal-title"
                          aria-describedby="modal-description">
                <CloseImgBox>
                    <CloseImg
                        src="src/assets/icons/etc/close-button.svg"
                        onTouchStart={handleTouchClose}
                        tabIndex={0}
                        aria-label="Close modal"
                    />
                </CloseImgBox>
                <ContentWrapper>
                    {modalType === "delete" ? (
                        <TextBox id="modal-description">
                            <DeleteText id="modal-title">{deleteMessage}</DeleteText>
                        </TextBox>
                    ) : (
                        <TextInputWrapper>
                            {modalSize !== "" && (
                                <TextInput
                                    textInputPlaceholder={firstPlaceholder}
                                    handleChangeTextInput={handleChangeFirstValue}
                                    aria-label={firstPlaceholder}
                                />
                            )}
                            {modalSize === "large" && (
                                <TextInput
                                    textInputPlaceholder={secondPlaceholder}
                                    handleChangeTextInput={handleChangeSecondValue}
                                    aria-label={secondPlaceholder}
                                />
                            )}
                        </TextInputWrapper>
                    )}
                    <Button handleTouchButton={handleTouchButton}>{children}</Button>
                </ContentWrapper>
            </ModalWrapper>
        </ModalContainer>
    );
};

export default Modal;