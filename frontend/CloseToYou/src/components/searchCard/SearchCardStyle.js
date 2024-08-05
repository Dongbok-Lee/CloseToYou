import styled from '@emotion/styled'

const SearchCardStyle = styled.div`

    box-sizing: border-box;

    display: flex;

    justify-content: space-between;
    align-items: center;

    gap: 2.5rem;

    border-radius: 0.625rem;
    border: 1px solid rgba(255, 105, 105, 1);

    width: 22rem;
    height: 10rem;

    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    -webkit-tap-highlight-color: transparent;

    .search-card-left-box {
        margin-left: 2rem;
    }

    .search-card-icon-box {
        width: 5rem;
        height: 5rem;
    }

    .search-card-icon {
        width: 100%;
        height: 100%;

        background: url(src/assets/icons/etc/yellow-tshirt.svg) center no-repeat;

        background-size: 100% 100%;
    }

    .search-card-right-box {
        display: flex;

        flex-direction: column;

        justify-content: center;

        flex: 1;

        width: 5rem;
        height: 5rem;

        text-align: left;
        font-size: 1.5rem;
        font-weight: 400;

        margin-right: 2rem;
    }

    &:focus {
        border: 3px solid rgba(255, 105, 105, 1);

        outline: none;

        .search-card-location {
            color: rgba(255, 105, 105, 1);

            font-weight: 600;
        }
    }
`

export default SearchCardStyle;
