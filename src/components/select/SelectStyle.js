import styled from '@emotion/styled'

const SelectStyle = styled.div`

    box-sizing: border-box;

    display: flex;

    flex-direction: column;

    width: 7.5rem;

    color: rgba(0, 0, 0, 1);

    font-size: 1.25rem;
    font-weight: 400;

    gap: 0.31rem;

    .select-up-box {
        display: flex;

        justify-content: space-between;

        border-radius: 0.3125rem;
        border: 1px solid rgba(169, 169, 169, 1);

        height: 2.5rem;

        line-height: 2.5rem;

        padding-left: 0.63rem;

        &:focus {
            border: 1px solid rgba(255, 105, 105, 1);

            color: rgba(255, 105, 105, 1);

            outline: none;

            .select-up-icon {
                background: url(src/assets/icons/up-arrow.svg) center no-repeat;
            }
        }
    }   

    .select-up-icon {
        width: 2.31388rem;
        height: 100%;

        background: url(src/assets/icons/down-arrow.svg) center no-repeat;
    }

   .select-list {
        overflow-y: auto;

        border-radius: 0.3125rem;
        border: 1px solid rgba(169, 169, 169, 1);
        
        height: 11rem;
        
        padding-left: 0.63rem;
        padding-right: 0.5rem;

        &::-webkit-scrollbar {
            width: 1rem;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 0.625rem;
            border: 5px solid rgba(255, 255, 255, 1);

            background-color: rgba(169, 169, 169, 1);
        }

        &::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0);
        }

        &::-webkit-scrollbar-button {
            display: none;
        }
    }

    .select-list-item {
        list-style: none;

        margin: 1rem 0;

        &:focus {
            color: rgba(255, 105, 105, 1);

            outline: none;

            .select-down-box {
                border: 1px solid rgba(255, 105, 105, 1);
            }
        }
    }

    li:first-of-type, li:last-of-type {
        margin: 0.62rem 0;
    }
`;

export default SelectStyle;
