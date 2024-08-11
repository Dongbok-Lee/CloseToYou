import styled from "@emotion/styled";

export const FilterItemContainer = styled.div`
    margin: 0.5rem;
    padding: 0.6rem;
    border-radius: 0.325rem;
    border: 0.5px solid ${props => props.theme.colors.border[0]};
    background: ${props => props.theme.colors.background[0]};
`

export const ItemWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 0.8rem;
`

export const ItemBox = styled.div`
    border-radius: 1.25rem;
    border: 0.5px solid ${props => (props.theme.colors.border[0])};
    background: ${props => props.theme.colors.background[0]};
    padding: 0.5rem 0.7rem;
    margin: 0.2rem;
    color: ${props => (props.theme.colors.text[0])};

    &:focus {
        background-color: ${props => props.theme.colors.point[0]};
        color: ${props => props.theme.colors.text[1]}
    }
`

export const ItemText = styled.p`
    margin: 0;
    font-size: 1rem;
    font-weight: 400;
`