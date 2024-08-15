import HeaderContainer from "./HeaderStyle";
import BackIcon from "../../assets/icons/etc/back.svg";
import SearchIcon from "../../assets/icons/etc/search.svg";
import BackDarkIcon from "../../assets/icons/etc/back-dark.svg";
import SearchDarkIcon from "../../assets/icons/etc/search-dark.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";

const icons = {
  back: BackIcon,
  search: SearchIcon,
};

const Header = () => {
  const [title, setTitle] = useState("default");
  const location = useLocation();
  const navigate = useNavigate();

  const theme = useTheme();
  const { mode } = useTheme();

  useEffect(() => {
    if (mode === 1) {
      icons.back = BackDarkIcon;
      icons.search = SearchDarkIcon;
    }

    const path = location.pathname;

    switch (true) {
      case path === "/signin":
        setTitle("로그인");
        break;
      case path === "/signup":
        setTitle("회원가입");
        break;
      case path === "/closets":
        setTitle("나의 옷장");
        break;
      case /^\/closet\/\d+$/.test(path):
        setTitle("나의 옷장");
        break;
      case path === "/clothes":
        setTitle("나의 옷");
        break;
      case /^\/clothes\/\d+$/.test(path):
        setTitle("상세보기");
        break;
      case /^\/clothes\/edit\/\d+$/.test(path):
        setTitle("수정하기");
        break;
      case path === "/search":
        setTitle("검색");
        break;
      case path === "/bookmarks":
        setTitle("나의 코디");
        break;
      case /^\/bookmarks\/\d+$/.test(path):
        setTitle("나의 코디");
        break;
      case path === "/user":
        setTitle("마이페이지");
        break;
      case path === "/nickname":
        setTitle("닉네임 변경");
        break;
      case path === "/password":
        setTitle("비밀번호 변경");
        break;
      case path === "/clothes/nfc":
        setTitle("NFC 태그");
        break;
      default:
        setTitle("default");
        break;
    }
  }, [location.pathname]);

  const handleTouchBackIcon = () => {
    navigate(-1);
  };

  const handleTouchSearchIcon = () => {
    navigate("/search");
  };

  const isSearchPage = location.pathname === "/search";

  return (
    <HeaderContainer>
      <div
        style={{
          width: "95%",
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button className="Button" onTouchStart={handleTouchBackIcon} aria-label="뒤로가기">
          <img
            src={icons.back}
            alt="뒤로가기"
            style={{ width: "25px", height: "25px", verticalAlign: "middle" }}
          />
        </button>
        <span className="Title">{title}</span>
        <div className="IconContainer">
          <button className="Button" onTouchStart={handleTouchSearchIcon} aria-label="검색">
            {!isSearchPage && (
              <img
                src={icons.search}
                alt="검색"
                style={{ width: "25px", height: "25px", verticalAlign: "middle" }}
              />
            )}
          </button>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Header;
