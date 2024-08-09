import styled from "@emotion/styled";

export const SignUpPageContainer = styled.div`
    display: flex;

    width: 100%;
    height: 100vh;

    flex-direction: column;

    justify-content: center;
    align-items: center;

    background-color: rgba(255, 105, 105, 1);

    padding: 2rem 0;

    TEXTINPUT {
        margin:0.2rem 0 0.2rem 0;
    }

    BUTTON {
        margin-top: 0.2rem;
        padding: 0.5rem;
    }

    span {
        height: 1.2rem;
    }

    p {
        margin: 0;
        padding: 0.3rem;
    }
`;

export const ErrorText = styled.p`
    align-self: flex-start;

    color: rgba(255, 105, 105, 1);

    font-size: 0.9rem;
    font-weight: 400;

    padding-left: 0.5rem;
`;

export const SignUpLogoImg = styled.img`
    width: 5rem;
    height: 8rem;
`;

export const SignUpTitle = styled.p`
    color: rgba(255, 255, 255, 1);

    text-align: center;
    font-size: 1.5rem;
    font-weight: 800;
`;

export const SingUpInfoWrapper = styled.div`
    display: flex;

    flex-direction: column;

    justify-content: center;
    align-items: center;

    background-color: rgba(255, 255, 255, 1);

    max-width: 370.5px;
    width: 95%;
    height: 100%;
    border-radius: 1.25rem;
    
    margin-top: 1rem;

    box-shadow: 2px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const SignUpInfoTitle = styled.p`
    color: rgba(255, 105, 105, 1);

    text-align: center;
    font-size: 2rem;
    font-weight: 800;

    padding: 0.5rem;
`;

export const SignUpInfoNickname = styled.div`
    display: flex;

    flex-direction: column;

    justify-content: center;
    align-items: center;
`;

export const AuthWrapper = styled.div`
    display: flex;

    flex-direction: column;

    justify-conten: center;
    align-items: center;
`;

export const AuthCodeWrapper = styled.div`
    display: flex;

    justify-content: center;
    align-items: center;

    gap: 1rem;

    margin-top: 0.8rem;
`;

export const PasswordWrapper = styled.div`  
    display: flex;

    flex-direction: column;

    justify-content: center;
    align-items: center;
`;
