import { useNavigate } from "react-router-dom";
import SearchCardStyle from "./SearchCardStyle";

const SearchCard = ({
  searchCardName,
  closetNickname,
  clothesLocation,
  clothesId,
  clothesType,
  clothesColor,
}) => {
  const navigate = useNavigate();
  const iconUrl = `/src/assets/icons/clothes/${clothesType}/${clothesColor}.png`;

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      navigate(`/clothes/${clothesId}`);
    }
  };

  const searchCardLocation = `${closetNickname} ${clothesLocation}`;

  return (
    <SearchCardStyle
      onTouchStart={() => navigate(`/clothes/${clothesId}`)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={`옷 이름: ${searchCardName}, 위치: ${searchCardLocation}`}
    >
      <div className="leftBox" style={{ backgroundImage: `url(${iconUrl})` }}></div>
      <div className="rightBox">
        <div className="name">{searchCardName}</div>
        <div className="location">{clothesLocation}</div>
      </div>
    </SearchCardStyle>
  );
};

export default SearchCard;
