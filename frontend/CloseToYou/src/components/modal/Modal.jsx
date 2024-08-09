import ModalStyle from "./ModalStyle";
import Button from "../button/Button";
import Input from "../input/Input";

const Modal = ({
  modalType,
  modalSize,
  modalPlaceholderFirst,
  modalPlaceholderSecond,
  setIsOpenModal,
  children,
}) => {
  const deleteText = "정말 삭제 하시겠어요?";

  const handleTouchCloseIcon = e => {
    e.target.focus();

    setTimeout(() => {
      e.target.blur();
      setIsOpenModal(false);
    }, 100);
  };

  const handleTouchButton = e => {
    e.target.focus();

    setTimeout(() => {
      e.target.blur();
      setIsOpenModal(false);
    }, 100);
  };

  return (
    <ModalStyle modalType={modalType} modalSize={modalSize}>
      <div className="modal-container">
        <div className="modal-up-box">
          <div className="close-icon-box">
            <div className="close-icon" onTouchStart={handleTouchCloseIcon} tabIndex={0}></div>
          </div>
        </div>
        <div className="modal-down-box">
          <div className="modal-down-input">
            {modalType === "delete" && <div className="modal-delete-text">{deleteText}</div>}
            {modalSize === "large" && modalType !== "delete" && (
              <Input inputSize="medium" inputPlaceholder={modalPlaceholderSecond}></Input>
            )}
            {modalType !== "delete" && (
              <Input inputSize="medium" inputPlaceholder={modalPlaceholderFirst}></Input>
            )}
          </div>
          <div className="modal-down-button">
            <Button btnSize="small" onTouchStart={handleTouchButton}>
              {children}
            </Button>
          </div>
        </div>
      </div>
    </ModalStyle>
  );
};

export default Modal;
