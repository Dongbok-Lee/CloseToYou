import SearchCardStyle from "./SearchCardStyle";

const SearchCard = ({ searchCardName, searchCardLocation, handleTouchSearchCard }) => {
  return (
    <SearchCardStyle onTouchStart={handleTouchSearchCard} tabIndex={0}>
      <div className="left-box">
        <div className="icon-box">
          <div className="icon"></div>
        </div>
      </div>
      <div className="right-box">
        <div className="name">{searchCardName}</div>
        <div className="location">{searchCardLocation}</div>
      </div>
    </SearchCardStyle>
  );
};

export default SearchCard;
