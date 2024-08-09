import { useState, useEffect } from "react";
import { SearchPageContainer, ResultMessage, ResultCount } from "./SearchPageStyle";
import SearchBox from "../../components/searchbox/SearchBox";
import SearchCard from "../../components/searchCard/SearchCard";

const clothes = [
  { id: 1, nickname: "산뜻 노랑", location: "A-14", closet_id: 1, type: "blouse", color: "yellow" },
  { id: 2, nickname: "시원한 블루", location: "B-22", closet_id: 2, type: "t-shirt", color: "blue" },
  { id: 3, nickname: "따뜻한 레드", location: "C-10", closet_id: 1, type: "shirt", color: "red" },
  { id: 4, nickname: "부드러운 그린", location: "D-5", closet_id: 3, type: "skirt", color: "green" },
  { id: 5, nickname: "클래식 블랙", location: "E-8", closet_id: 2, type: "dress", color: "black" },
];

const closets = [
  { id: 1, nickname: "봄 옷장" },
  { id: 2, nickname: "여름 옷장" },
  { id: 3, nickname: "가을 옷장" },
];

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const results = clothes
      .filter((item) => item.nickname.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((item) => {
        const closet = closets.find((closet) => closet.id === item.closet_id);
        return { ...item, closet_nickname: closet ? closet.nickname : "" };
      });
    setSearchResults(results);
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <SearchPageContainer className="page">
      <SearchBox onSearch={handleSearch} />
      {searchQuery === "" ? (
        <ResultMessage>검색어를 입력해주세요.</ResultMessage>
      ) : searchResults.length === 0 ? (
        <ResultMessage>검색된 결과가 없습니다.</ResultMessage>
      ) : (
        <>
          <ResultCount>
            검색 결과: <span>{searchResults.length}</span>개
          </ResultCount>
          {searchResults.map((result) => (
            <SearchCard
              key={result.id}
              searchCardName={result.nickname}
              searchCardLocation={`${result.closet_nickname} ${result.location}`}
              clothesId={result.id}
              clothesType={result.type}
              clothesColor={result.color}
              handleTouchSearchCard={() => console.log(result.id)}
            />
          ))}
        </>
      )}
    </SearchPageContainer>
  );
};

export default SearchPage;
