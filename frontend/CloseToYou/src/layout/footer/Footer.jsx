import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import FooterStyle from "./FooterStyle";

const Footer = () => {
  const nav = useNavigate();

  let location = useLocation();

  const [url, setUrl] = useState("");

  const handleTouchClosetIcon = e => {
    setTimeout(() => {
      e.target.blur();

      setUrl(location.pathname);

      nav("/closets");
    }, 100);
  };

  const handleTouchHangerIcon = e => {
    setTimeout(() => {
      e.target.blur();

      nav("/clothes");
    }, 100);
  };

  const handleTouchBookmarkIcon = e => {
    setTimeout(() => {
      e.target.blur();

      nav("/bookmark");
    }, 100);
  };

  const handleTouchProfileIcon = e => {
    setTimeout(() => {
      e.target.blur();

      nav("/mypage");
    }, 100);
  };

  return (
    <FooterStyle>
      <div className="footer-container">
        <div className="footer-closet-box" onTouchStart={handleTouchClosetIcon} tabIndex={0}>
          {url === "/closets" ? (
            <div className="footer-closet-icon-box">
              <div className="footer-closet-icon touched"></div>
            </div>
          ) : (
            <div className="footer-closet-icon-box">
              <div className="footer-closet-icon"></div>
            </div>
          )}

          <div className="footer-content">옷장</div>
        </div>
        <div className="footer-hanger-box" onTouchStart={handleTouchHangerIcon} tabIndex={0}>
          <div className="footer-hanger-icon-box">
            <div className="footer-hanger-icon"></div>
          </div>
          <div className="footer-content">옷</div>
        </div>
        <div className="footer-bookmark-box" onTouchStart={handleTouchBookmarkIcon} tabIndex={0}>
          <div className="footer-bookmark-icon-box">
            <div className="footer-bookmark-icon"></div>
          </div>
          <div className="footer-content">북마크</div>
        </div>
        <div className="footer-profile-box" onTouchStart={handleTouchProfileIcon} tabIndex={0}>
          <div className="footer-profile-icon-box">
            <div className="footer-profile-icon"></div>
          </div>
          <div className="footer-content">프로필</div>
        </div>
      </div>
    </FooterStyle>
  );
};

export default Footer;
