import React, { useState, useEffect } from "react";
import {
  SearchPageContainer,
  ResultMessage,
  ResultCount,
} from "./SearchPageStyle";
import SearchBox from "../../components/searchbox/SearchBox";
import SearchCard from "../../components/searchCard/SearchCard";

import { useClothesStore } from "../../stores/clothes";

let clothes = [];

const closets = [];

const SearchPage = () => {
  const { clothesList, searchClothesByKeyword } = useClothesStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const results = clothesList
      .filter(item => item.nickname.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(item => {
        const closet = closets.find(closet => closet.id === item.closet_id);
        return { ...item, closet_nickname: closet ? closet.nickname : "" };
      });
    setSearchResults(results);
  }, [searchQuery, clothesList]);

  const handleSearch = async query => {
    setSearchQuery(query);
    await searchClothesByKeyword(query);
  };

  return (
    <SearchPageContainer className="page">
      <SearchBox onSearch={handleSearch} />

      {searchQuery === "" ? (
        <ResultMessage aria-live="polite">검색어를 입력해주세요.</ResultMessage>
      ) : searchResults.length === 0 ? (
        <ResultMessage aria-live="polite">검색된 결과가 없습니다.</ResultMessage>
      ) : (
        <>
          <ResultCount aria-live="polite">
            검색 결과: <span>{searchResults.length}</span>개
          </ResultCount>
          {searchResults.map(result => {
            console.dir(result);
            return (
              <SearchCard
                key={result.clothesId}
                searchCardName={result.nickname}
                clothesLocation={`${result.closetNickname} ${result.location}`}
                clothesId={result.clothesId}
                clothesType={result.type}
                clothesColor={result.color}
                handleTouchSearchCard={() => console.log(result.clothesId)}
              />
            );
          })}
        </>
      )}
    </SearchPageContainer>
  );
};

export default SearchPage;
