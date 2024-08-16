import { useEffect, useState } from "react";
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

import ClosetBasicImg from "../../assets/icons/etc/closet-basic.svg";
import ClosetFocusImg from "../../assets/icons/etc/closet-focus.svg";
import ClothesBasicImg from "../../assets/icons/etc/hanger-basic.svg";
import ClothesFocusImg from "../../assets/icons/etc/hanger-focus.svg";
import BookmarkBasicImg from "../../assets/icons/etc/bookmark-basic.svg";
import BookmarkFocusImg from "../../assets/icons/etc/bookmark-focus.svg";
import ProfileBasicImg from "../../assets/icons/etc/profile-basic.svg";
import ProfileFocusImg from "../../assets/icons/etc/profile-focus.svg";
import ClosetBasicDarkImg from "../../assets/icons/etc/closet-basic-dark.svg";
import BookmarkBasicDarkImg from "../../assets/icons/etc/closet-basic-dark.svg";
import ProfileBasicDarkImg from "../../assets/icons/etc/closet-basic-dark.svg";
import ClosetFocusDarkImg from "../../assets/icons/etc/closet-focus-dark.svg";
import BookmarkFocusDarkImg from "../../assets/icons/etc/closet-focus-dark.svg";
import ProfileFocusDarkImg from "../../assets/icons/etc/closet-focus-dark.svg";
import ClothesBasicDarkImg from "../../assets/icons/etc/hanger-basic-dark.svg";
import ClothesFocusDarkImg from "../../assets/icons/etc/hanger-focus-dark.svg";

import { useTheme } from "@emotion/react";

const Footer = () => {
  const nav = useNavigate();
  const theme = useTheme();
  const { mode } = theme;

  let location = useLocation();

  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(location.pathname);
    console.log(location.pathname);
  }, [location.pathname]);

  const handleTouchCloset = () => {
    setTimeout(() => {
      document.activeElement.blur();
      nav("/closets");
    }, 150);
  };

  const handleTouchClothes = () => {
    setTimeout(() => {
      document.activeElement.blur();
      nav("/clothes");
    }, 150);
  };

  const handleTouchBookmark = () => {
    setTimeout(() => {
      document.activeElement.blur();
      nav("/bookmarks");
    }, 150);
  };

  const handleTouchProfile = () => {
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
                ? ClosetFocusDarkImg
                : ClosetBasicDarkImg
              : url.includes("/closets")
                ? ClosetFocusImg
                : ClosetBasicImg
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
                ? ClothesFocusDarkImg
                : ClothesBasicDarkImg
              : url.includes("/clothes")
                ? ClothesFocusImg
                : ClothesBasicImg
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
                ? BookmarkFocusDarkImg
                : BookmarkBasicDarkImg
              : url.includes("/bookmarks")
                ? BookmarkFocusImg
                : BookmarkBasicImg
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
                ? ProfileFocusDarkImg
                : ProfileBasicDarkImg
              : url.includes("/user") || url.includes("/nickname") || url.includes("/password")
                ? ProfileFocusImg
                : ProfileBasicImg
          }
          alt="프로필로 바로가기"
        />
        <ProfileText url={url}>프로필</ProfileText>
      </ProfileWrapper>
    </FooterContainer>
  );
};

export default Footer;
