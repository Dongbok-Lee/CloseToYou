import styled from "@emotion/styled";

export const ModalContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  -webkit-tap-highlight-color: transparent;
`;

export const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  border-radius: 0.625rem;
  width: 90%;
  max-width: 30rem;
  height: ${props => (props.size === "large" ? "20rem" : "15rem")};

  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
`;

export const CloseImgBox = styled.div`
  display: flex;

  justify-content: flex-end;

  width: 100%;

  margin: 0.5rem 0;
`;

export const CloseImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;

  margin-right: 0.3rem;

  &:focus {
    border: 3px solid rgba(255, 105, 105, 1);

    outline: none;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;

  flex-direction: column;

  justify-content: space-evenly;
  align-items: center;

  width: 80%;
  height: 100%;

  gap: 1rem;

  margin-bottom: 3rem;
`;

export const TextBox = styled.div`
  width: 100%;
`;

export const DeleteText = styled.p`
  text-align: center;
  font-size: 1.3rem;
  font-weight: 400;
`;

export const TextInputWrapper = styled.div`
  display: flex;

  flex-direction: column;

  justify-content: center;
  align-items: center;

  gap: 0.5rem;
`;

export const Text = styled.p`
  font-size: 1.25rem;
`;
