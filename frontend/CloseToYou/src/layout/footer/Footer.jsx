import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  FooterContainer,
  ClosetImg,
  ClosetWrapper,
  ClosetText,
  ClothesWrapper,
  ClothesImg,
  ClothesText,
  BookmarkWrapper,
  BookmarkImg,
  BookmarkText,
  ProfileWrapper,
  ProfileImg,
  ProfileText,
} from "./FooterStyle";

import ClosetBaiscImg from "https://i11b201.p.ssafy.io/assets/icons/etc/closet-basic.svg";
import ClosetFocusImg from "https://i11b201.p.ssafy.io/assets/icons/etc/closet-focus.svg";
import ClothesBasicImg from "https://i11b201.p.ssafy.io/assets/icons/etc/hanger-basic.svg";
import ClothesFocusImg from "https://i11b201.p.ssafy.io/assets/icons/etc/hanger-focus.svg";
import BookmarkBasicImg from "https://i11b201.p.ssafy.io/assets/icons/etc/bookmark-basic.svg";
import BookmarkFocusImg from "https://i11b201.p.ssafy.io/assets/icons/etc/bookmark-focus.svg";
import ProfileBasicImg from "https://i11b201.p.ssafy.io/assets/icons/etc/profile-basic.svg";
import ProfileFocusImg from "https://i11b201.p.ssafy.io/assets/icons/etc/profile-focus.svg";

const Footer = () => {
  const nav = useNavigate();

  let location = useLocation();

  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(location.pathname);
    console.log(location.pathname);
  }, [location.pathname]);

  const handleTouchCloset = e => {
    setTimeout(() => {
      document.activeElement.blur();
      nav("/closets");
    }, 150);
  };

  const handleTouchClothes = e => {
    setTimeout(() => {
      document.activeElement.blur();
      nav("/clothes");
    }, 150);
  };

  const handleTouchBookmark = e => {
    setTimeout(() => {
      document.activeElement.blur();
      nav("/bookmarks");
    }, 150);
  };

  const handleTouchProfile = e => {
    setTimeout(() => {
      document.activeElement.blur();
      nav("/user");
    }, 150);
  };

  return (
    <FooterContainer>
      <ClosetWrapper tabIndex={0} onTouchStart={handleTouchCloset}>
        {url.includes("/closets") ? (
          <ClosetImg src={ClosetFocusImg} alt="옷장으로 바로가기"></ClosetImg>
        ) : (
          <ClosetImg src={ClosetBaiscImg} alt="옷장으로 바로가기"></ClosetImg>
        )}
        <ClosetText url={url}>옷장</ClosetText>
      </ClosetWrapper>
      <ClothesWrapper tabIndex={0} onTouchStart={handleTouchClothes}>
        {url.includes("/clothes") ? (
          <ClothesImg src={ClothesFocusImg} alt="옷으로 바로가기"></ClothesImg>
        ) : (
          <ClothesImg src={ClothesBasicImg} alt="옷으로 바로가기"></ClothesImg>
        )}
        <ClothesText url={url}>옷</ClothesText>
      </ClothesWrapper>
      <BookmarkWrapper tabIndex={0} onTouchStart={handleTouchBookmark}>
        {url.includes("/bookmarks") ? (
          <BookmarkImg src={BookmarkFocusImg} alt="북마크로 바로가기"></BookmarkImg>
        ) : (
          <BookmarkImg src={BookmarkBasicImg} alt="북마크로 바로가기"></BookmarkImg>
        )}
        <BookmarkText url={url}>북마크</BookmarkText>
      </BookmarkWrapper>
      <ProfileWrapper tabIndex={0} onTouchStart={handleTouchProfile}>
        {url.includes("/user") || url.includes("/nickname") || url.includes("/password") ? (
          <ProfileImg src={ProfileFocusImg} alt="프로필로 바로가기"></ProfileImg>
        ) : (
          <ProfileImg src={ProfileBasicImg} alt="프로필로 바로가기"></ProfileImg>
        )}
        <ProfileText url={url}>프로필</ProfileText>
      </ProfileWrapper>
    </FooterContainer>
  );
};

export default Footer;
