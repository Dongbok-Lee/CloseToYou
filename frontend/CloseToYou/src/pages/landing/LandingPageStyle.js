import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

export const LandigPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    justify-content: center;
    overflow: hidden;
    opacity: 0;
    animation: ${fadeIn} 1s ease-in-out forwards;
    animation-delay: 0.5s; 
`;

export const AppTitleText = styled.p`
    font-size: 2rem;
    font-style: normal;
    font-weight: 800;
    color: #ff6969;
`;
