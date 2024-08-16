import styled from "@emotion/styled";

export const SignInPageContainer = styled.div`
  display: flex;

  flex-direction: column;

  justify-content: center;
  align-items: center;

  height: 90vh;

  gap: 1rem;

  span {
    height: 1.2rem;
  }
`;

export const SignInTitle = styled.p`
  box-sizing: border-box;

  width: 100%;

  color: rgba(255, 105, 105, 1);

  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;

  line-height: 2.5rem;

  margin: 0;

  &:focus {
    border: 3px solid rgba(255, 105, 105, 1);

    outline: none;
  }
`;

export const Logo = styled.img`
  width: 7rem;
  height: 10rem;
`;

export const UserInfoInputWrapper = styled.div`
  display: flex;

  flex-direction: column;

  justify-content: center;
  align-items: center;

  width: 100%;

  gap: 0.8rem;

  margin-top: 1.5rem;
`;

export const ErrorText = styled.p`
  box-sizing: border-box;

  align-self: flex-start;

  color: rgba(255, 105, 105, 1);

  text-align: center;
  font-size: 1rem;
  font-weight: 400;

  margin: 0;
  padding-left: 0.5rem;
`;

export const SignInUpButtonWrapper = styled.div`
  display: flex;

  flex-direction: column;

  width: 100%;

  gap: 0.8rem;
`;

export const SNSButtonWrapper = styled.div`
  display: flex;

  width: 100%;

  justify-content: center;
  align-items: center;

  gap: 1.25rem;

  margin-top: 3rem;
`;
