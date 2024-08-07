import styled from "@emotion/styled";

const ModalStyle = styled.div`
  box-sizing: border-box;

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  display: flex;

  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.2);

  -webkit-tap-highlight-color: transparent;

  .modal-container {
    box-sizing: border-box;

    display: flex;

    flex-direction: column;

    justify-content: flex-start;
    align-items: center;

    gap: 0.38rem;

    border-radius: 0.625rem;

    width: 18.75rem;
    height: 13.75rem;

    background-color: rgba(255, 255, 255, 1);

    ${({ modalSize }) =>
      modalSize === "large" &&
      `
            height: 16.5625rem;
        `}
  }

  .modal-up-box {
    display: flex;

    justify-content: flex-end;

    width: 100%;

    padding: 0.5rem;
  }

  .close-icon {
    width: 2.5rem;
    height: 2.5rem;

    background: url(src/assets/icons/etc/close-button.svg) center no-repeat;

    &:focus {
      border: 2px solid rgba(255, 105, 105, 1);

      outline: none;
    }
  }

  .modal-down-box {
    display: flex;

    flex-direction: column;

    justify-content: center;
    align-items: center;

    ${({ modalType }) =>
      modalType === "delete" &&
      `
            gap: 1.25rem;
        `}

    ${({ modalType }) =>
      modalType !== "delete" &&
      `
            gap: 0.63rem;
        `}
  }

  .modal-down-input {
    display: flex;

    flex-direction: column;

    justify-content: center;
    align-items: center;

    gap: 0.4rem;
  }

  .modal-delete-text {
    color: rgba(0, 0, 0, 1);

    text-align: center;
    font-size: 1.5rem;
    font-weight: 400;
  }
`;

export default ModalStyle;
