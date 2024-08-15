import React, { useCallback } from "react";
import { FilterItemContainer, ItemBox, ItemText, ItemWrapper } from "./FilterItemStyle.js";
import { filterMap, translate } from "../../../constants/filter.js";
import { FilterOpenTextWrapper } from "../list/FilterListStyle.js";
import { useDoubleClick } from "../../../hooks/useDoubleClick.js";
import useClothesStore from "../../../stores/clothes.jsx";

const FilterItem = ({ title, isOpen, setIsOpen, setIsDisabled }) => {
  const [isDoubleClick, updateTouchTime] = useDoubleClick();

  const { loadClothesByFilter } = useClothesStore();

  const handleClickShowFilterItem = useCallback(() => {
    setIsOpen(prev => ({ ...prev, [title]: !prev[title] }));
  }, [setIsOpen, title]);

  const handleTouchItem = item => {
    if (isDoubleClick()) {
      setIsDisabled(false);
      loadClothesByFilter(0, translate[title], translate[item]);
    } else {
      updateTouchTime();
    }
  };

  return (
    <FilterItemContainer>
      <FilterOpenTextWrapper>
        <p className="not-active-text" tabIndex={0}>
          {title}
        </p>
        <p
          className={isOpen[title] ? "active-text" : "not-active-text underline"}
          onClick={handleClickShowFilterItem}
          tabIndex={0}
        >
          {isOpen[title] ? "접기" : "펼치기"}
        </p>
      </FilterOpenTextWrapper>
      {isOpen[title] && (
        <ItemWrapper tabIndex={0}>
          {filterMap[title].map((item, index) => (
            <ItemBox key={index} onTouchStart={() => handleTouchItem(item)} tabIndex={0}>
              <ItemText>{item}</ItemText>
            </ItemBox>
          ))}
        </ItemWrapper>
      )}
    </FilterItemContainer>
  );
};

export default React.memo(FilterItem);
