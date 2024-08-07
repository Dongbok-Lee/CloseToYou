import styled from "@emotion/styled";

const FooterStyle = styled.div`
  box-shadow: 1px 0px 4px 0px rgba(0, 0, 0, 0.25);

  width: 100%;
  height: 5rem;

  -webkit-tap-highlight-color: transparent;

  .footer-container {
    display: flex;

    justify-content: center;
    align-items: center;

    height: 5rem;
  }

  .footer-closet-box,
  .footer-hanger-box,
  .footer-bookmark-box,
  .footer-profile-box {
    display: flex;

    flex-direction: column;

    justify-content: center;
    align-items: center;

    flex: 1;

    width: 100%;
    height: 100%;

    color: rgba(169, 169, 169, 1);

    text-align: center;
    font-size: 1rem;
    font-weight: 700;

    cursor: pointer;

    .footer-closet-icon-box,
    .footer-hanger-icon-box,
    .footer-bookmark-icon-box,
    .footer-profile-icon-box {
      width: 2.1875rem;
      height: 2.1875rem;
    }

    .footer-closet-icon {
      width: 100%;
      height: 100%;

      background: url(src/assets/icons/etc/closet-basic.svg) center no-repeat;

      background-size: 100% 100%;
    }

    .footer-hanger-icon {
      width: 2.1875rem;
      height: 2.1875rem;

      background: url(src/assets/icons/etc/hanger-basic.svg) center no-repeat;
    }

    .footer-bookmark-icon {
      width: 2.1875rem;
      height: 2.1875rem;

      background: url(src/assets/icons/etc/bookmark-basic.svg) center no-repeat;
    }

    .footer-profile-icon {
      width: 2.1875rem;
      height: 2.1875rem;

      background: url(src/assets/icons/etc/profile-basic.svg) center no-repeat;
    }

    &:focus {
      background-color: rgba(0, 0, 0, 0.1);

      outline: none;
    }

    .footer-closet-icon touched {
      color: rgba(255, 105, 105, 1);

      background: url(src/assets/icons/etc/closet-focus.svg) center no-repeat;
    }

    .footer-hanger-icon touched {
      color: rgba(255, 105, 105, 1);

      background: url(src/assets/icons/etc/hanger-focus.svg) center no-repeat;
    }

    .footer-bookmark-icon touched {
      color: rgba(255, 105, 105, 1);

      background: url(src/assets/icons/etc/bookmark-focus.svg) center no-repeat;
    }

    .footer-profile-icon touched {
      color: rgba(255, 105, 105, 1);

      background: url(src/assets/icons/etc/profile-focus.svg) center no-repeat;
    }
  }
`;

export default FooterStyle;
