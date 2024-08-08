/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { SearchBoxContainer } from "./SearchBoxStyle";
import SearchBoxIcon from "../../assets/icons/etc/searchbox.svg";

const SearchBox = ({ value = "", onSearch }) => {
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const handleChangeInput = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onSearch(newValue); // 검색어 변경 시 바로 onSearch 호출
  };

  const handleTouchSearch = () => {
    onSearch(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleTouchSearch();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <SearchBoxContainer isFocused={isFocused}>
      <input
        className="input"
        type="text"
        value={inputValue}
        onChange={handleChangeInput}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div className="icon-container" onTouchStart={handleTouchSearch}>
        <img src={SearchBoxIcon} alt="검색 아이콘" className="icon" />
      </div>
    </SearchBoxContainer>
  );
};

export default SearchBox;
