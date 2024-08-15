import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  BookmarkImg,
  BookmarkText,
  BookmarkWrapper,
  ClosetImg,
  ClosetText,
  ClosetWrapper,
  ClothesImg,
  ClothesText,
  ClothesWrapper,
  FooterContainer,
  ProfileImg,
  ProfileText,
  ProfileWrapper,
} from "./FooterStyle";
import { useTheme } from "@emotion/react";

const Footer = () => {
  const nav = useNavigate();
  const theme = useTheme();
  const { mode } = theme;

  let location = useLocation();

  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(location.pathname);
  }, [location.pathname]);


  const handleTouchCloset = (e) => {
    setTimeout(() => {
      document.activeElement.blur();
      nav("/closets");
    }, 150);
  };

  const handleTouchClothes = (e) => {
    setTimeout(() => {
      document.activeElement.blur();
      nav("/clothes");
    }, 150);
  };

  const handleTouchBookmark = (e) => {
    setTimeout(() => {
      document.activeElement.blur();
      nav("/bookmarks");

    }, 150);
  };

  const handleTouchProfile = (e) => {
    setTimeout(() => {
      document.activeElement.blur();
      nav("/user");

    }, 150);
  };

  return (
    <FooterContainer>
      <ClosetWrapper tabIndex={0} onTouchStart={handleTouchCloset}>
        <ClosetImg
          src={
            mode === 1
              ? url.includes("/closets")
                ? "src/assets/icons/etc/closet-focus-dark.svg"
                : "src/assets/icons/etc/closet-basic-dark.svg"
              : url.includes("/closets")
                ? "src/assets/icons/etc/closet-focus.svg"
                : "src/assets/icons/etc/closet-basic.svg"
          }
          alt="옷장으로 바로가기"
        />
        <ClosetText url={url}>옷장</ClosetText>
      </ClosetWrapper>
      <ClothesWrapper tabIndex={0} onTouchStart={handleTouchClothes}>
        <ClothesImg
          src={
            mode === 1
              ? url.includes("/clothes")
                ? "src/assets/icons/etc/hanger-focus-dark.svg"
                : "src/assets/icons/etc/hanger-basic-dark.svg"
              : url.includes("/clothes")
                ? "src/assets/icons/etc/hanger-focus.svg"
                : "src/assets/icons/etc/hanger-basic.svg"
          }
          alt="옷으로 바로가기"
        />
        <ClothesText url={url}>옷</ClothesText>
      </ClothesWrapper>
      <BookmarkWrapper tabIndex={0} onTouchStart={handleTouchBookmark}>
        <BookmarkImg
          src={
            mode === 1
              ? url.includes("/bookmarks")
                ? "src/assets/icons/etc/bookmark-focus-dark.svg"
                : "src/assets/icons/etc/bookmark-basic-dark.svg"
              : url.includes("/bookmarks")
                ? "src/assets/icons/etc/bookmark-focus.svg"
                : "src/assets/icons/etc/bookmark-basic.svg"
          }
          alt="북마크로 바로가기"
        />
        <BookmarkText url={url}>북마크</BookmarkText>
      </BookmarkWrapper>
      <ProfileWrapper tabIndex={0} onTouchStart={handleTouchProfile}>
        <ProfileImg
          src={
            mode === 1
              ? url.includes("/user") || url.includes("/nickname") || url.includes("/password")
                ? "src/assets/icons/etc/profile-focus-dark.svg"
                : "src/assets/icons/etc/profile-basic-dark.svg"
              : url.includes("/user") || url.includes("/nickname") || url.includes("/password")
                ? "src/assets/icons/etc/profile-focus.svg"
                : "src/assets/icons/etc/profile-basic.svg"
          }
          alt="프로필로 바로가기"
        />
        <ProfileText url={url}>프로필</ProfileText>
      </ProfileWrapper>
    </FooterContainer>
  );
};

export default Footer;
