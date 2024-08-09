import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderContainer from './HeaderStyle';
import BackIcon from '../../assets/icons/etc/back.svg';
import SearchIcon from '../../assets/icons/etc/search.svg';

const icons = {
  back: BackIcon,
  search: SearchIcon,
};

const Header = () => {
  const [title, setTitle] = useState("default");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;

    switch (true) {
      case path === "/signin":
        setTitle("로그인");
        break;
      case path === "/signup":
        setTitle("회원가입");
        break;
      case path === "/closets":
        setTitle("옷장 선택");
        break;
      case path === "/clothes":
        setTitle("옷 선택");
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
        setTitle("코디");
        break;
      case /^\/bookmarks\/\d+$/.test(path):
        setTitle("코디 상세");
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
      case /^\/clothes\/nfc\/\d+$/.test(path):
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
      <div className='header-content'>
        <button className="Button" onTouchStart={handleTouchBackIcon} aria-label="뒤로가기">
          <img src={icons.back} alt="뒤로가기" className="icon" />
        </button>
        <span className="Title">{title}</span>
        <div className="IconContainer">
          <button className="Button" onTouchStart={handleTouchSearchIcon} aria-label="검색">
            <img src={icons.search} alt="검색" className="icon" />
          </button>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Header;
