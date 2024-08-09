import { useNavigate } from "react-router-dom";
import SearchCardStyle from "./SearchCardStyle";

const SearchCard = ({ searchCardName, searchCardLocation, clothesId, clothesType, clothesColor, handleTouchSearchCard }) => {
  const navigate = useNavigate();
  const iconUrl = `/src/assets/icons/clothes/${clothesType}/${clothesColor}.png`;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/clothes/${clothesId}`);
    }
  };

  return (
    <SearchCardStyle
      onTouchStart={() => navigate(`/clothes/${clothesId}`)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={`옷 이름: ${searchCardName}, 위치: ${searchCardLocation}`}
    >
      <div className="left-box" style={{ backgroundImage: `url(${iconUrl})` }}></div>
      <div className="right-box">
        <div className="name">{searchCardName}</div>
        <div className="location">{searchCardLocation}</div>
      </div>
    </SearchCardStyle>
  );
};

export default SearchCard;
