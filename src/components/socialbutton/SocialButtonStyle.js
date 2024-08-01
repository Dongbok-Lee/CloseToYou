import styled from '@emotion/styled'

const SocialButtonStyle = styled.div`

    box-sizing: border-box;

    border-radius: 50% 50%;

    width: 4.375rem;
    height: 4.375rem;

    cursor: pointer;

    &:focus {
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.4) inset;
        
        outline: none;
    }

    ${({ socialBtnType }) => socialBtnType === 'kakao' && `
        background: url(src/assets/icons/kakao.svg);
    `}

    ${({ socialBtnType }) => socialBtnType === 'google' && `
        background: url(src/assets/icons/google.svg);
    `}
`

export default SocialButtonStyle;
