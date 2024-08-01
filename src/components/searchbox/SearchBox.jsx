/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { SearchBoxContainer } from './SearchBoxStyle';
import SearchboxIcon from '../../assets/icons/etc/searchbox.svg';

const SearchBox = ({ value = '', onSearch }) => {
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    onSearch(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
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
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div className="IconContainer" onClick={handleSearch}>
        <img src={SearchboxIcon} alt="검색 아이콘" className="icon" />
      </div>
    </SearchBoxContainer>
  );
};

export default SearchBox;
