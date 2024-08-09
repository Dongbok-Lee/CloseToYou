import styled from "@emotion/styled";

export const ClosetsPageContainer = styled.div`
    display: flex;

    width: 100%;
    height: 100%;

    flex-direction: column;

    span {
        height: 2.2rem;
    }
`;

export const ClosetTextWrapper = styled.div`
    display: flex;

    flex-direction: column;

    justify-content: center;

    text-align: center;

    gap: 1rem;

    padding-top: 4rem;
`;

export const ClosetTextTitleWrapper = styled.div`
    display: flex;

    align-items: center;

    gap: 0.5rem;
`;

export const ClosetImg = styled.img`
    width: 2rem;
    height: 2rem;
`;

export const ClosetText = styled.p`
    text-align: left;
    font-size: 1.25rem;
    font-weight: 600;

    line-height: 3rem;
`;

export const SelectedText = styled.p`
    color: rgba(255, 105, 105, 1);

    text-align: left;
    font-size: 1.625rem;
    font-weight: 700;
`;

export const ClosetSelectWrapper = styled.div`
    display: flex;

    flex-flow: wrap;

    justify-content: space-between;
    align-items: center;

    gap: 2.5rem;

    margin-left: 1.5rem;
    margin-right: 1.5rem;

    padding-top: 1.5rem;
`;

export const ClosetButtonWrapper = styled.div`
    display: flex;

    flex:1;

    justify-content: space-between;
    align-items: flex-end;

    padding-top : 4rem;
    padding-bottom: 1rem;
`;
