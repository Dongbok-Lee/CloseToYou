import HeaderContainer from './HeaderStyle';
import BackIcon from '../../assets/icons/etc/back.svg'
import SearchIcon from '../../assets/icons/etc/search.svg';

const icons = {
  back: BackIcon,
  search: SearchIcon,
};

const Header = ({ title, onBack, onSearch }) => {
  const handleIconClick = (type) => {
    if (type === 'back') onBack();
    else if (type === 'search') onSearch();
  };

  return (
    <HeaderContainer>
      <div style={{ width: "95%", margin: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button className="Button" onClick={() => handleIconClick('back')} aria-label="뒤로가기">
          <img src={icons.back} alt="뒤로가기" style={{ width: '25px', height: '25px', verticalAlign: 'middle' }} />
        </button>
        <span className="Title">{title}</span>
        <div className="IconContainer">
          <button className="Button" onClick={() => handleIconClick('search')} aria-label="검색">
            <img src={icons.search} alt="검색" style={{ width: '25px', height: '25px', verticalAlign: 'middle' }} />
          </button>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Header;
