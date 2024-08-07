import SearchCardStyle from "./SearchCardStyle";

const SearchCard = ({ searchCardName, searchCardLocation, handleTouchSearchCard }) => {
  return (
    <SearchCardStyle onTouchStart={handleTouchSearchCard} tabIndex={0}>
      <div className="search-card-left-box">
        <div className="search-card-icon-box">
          <div className="search-card-icon"></div>
        </div>
      </div>
      <div className="search-card-right-box">
        <div className="search-card-name">{searchCardName}</div>
        <div className="search-card-location">{searchCardLocation}</div>
      </div>
    </SearchCardStyle>
  );
};

export default SearchCard;
