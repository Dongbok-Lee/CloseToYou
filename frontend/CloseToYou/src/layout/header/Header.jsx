import HeaderContainer from './HeaderStyle';
import BackIcon from '../../assets/icons/etc/back.svg';
import SearchIcon from '../../assets/icons/etc/search.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

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

    switch (path) {
      case "/signin":
        setTitle("로그인");
        break;
      case "/signup":
        setTitle("회원가입");
        break;
      case "/closets":
        setTitle("옷장 선택");
        break;
      case "/clothes":
        setTitle("옷 선택");
        break;
      case path.match(/^\/clothes\/\d+$/)?.input:
        setTitle("옷 상세");
        break;
      case path.match(/^\/clothes\/edit\/\d+$/)?.input:
        setTitle("옷 상세 수정");
        break;
      case "/search":
        setTitle("검색");
        break;
      case "/bookmarks":
        setTitle("코디");
        break;
      case path.match(/^\/bookmarks\/\d+$/)?.input:
        setTitle("코디 상세");
        break;
      case "/user":
        setTitle("마이페이지");
        break;
      case "/nickname":
        setTitle("닉네임 변경");
        break;
      case "/password":
        setTitle("비밀번호 변경");
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

  return (
    <HeaderContainer>
      <div style={{ width: "95%", margin: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button className="Button" onTouchStart={handleTouchBackIcon} aria-label="뒤로가기">
          <img src={icons.back} alt="뒤로가기" style={{ width: '25px', height: '25px', verticalAlign: 'middle' }} />
        </button>
        <span className="Title">{title}</span>
        <div className="IconContainer">
          <button className="Button" onTouchStart={handleTouchSearchIcon} aria-label="검색">
            <img src={icons.search} alt="검색" style={{ width: '25px', height: '25px', verticalAlign: 'middle' }} />
          </button>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Header;
