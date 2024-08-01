import SocialButtonStyle from './SocialButtonStyle';

const SocialButton = ({ socialBtnType }) => {
    
    const handleClick = () => {
        document.getElementById("social-button").focus();
        document.getElementById("social-button").blur();      
      }

    return(
        <SocialButtonStyle id="social-button" tabIndex={0} socialBtnType={ socialBtnType } onClick={ handleClick }></SocialButtonStyle>
    );
}

export default SocialButton;
