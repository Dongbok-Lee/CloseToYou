import React, {useCallback} from "react";
import {FilterItemContainer, ItemBox, ItemText, ItemWrapper} from "./FilterItemStyle.js";
import {filterItems} from "../../../constants/filter.js";
import {FilterOpenTextWrapper} from "../list/FilterListStyle.js";
import {useDoubleClick} from "../../../hooks/useDoubleClick.js";

const FilterItem = ({title, isOpen, setIsOpen, setIsDisabled}) => {
    const [isDoubleClick, updateTouchTime] = useDoubleClick();

    const handleClickShowFilterItem = useCallback(() => {
        setIsOpen((prev) => ({...prev, [title]: !prev[title]}));
    }, [setIsOpen, title]);

    const handleTouchItem = () => {
        if (isDoubleClick()) {
            setIsDisabled(false);
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
                <p className={isOpen[title] ? "active-text" : "not-active-text underline"}
                   onClick={handleClickShowFilterItem} tabIndex={0}>
                    {isOpen[title] ? "접기" : "펼치기"}
                </p>
            </FilterOpenTextWrapper>
            {isOpen[title] && (
                <ItemWrapper tabIndex={0}>
                    {filterItems[title].map((item, index) => (
                        <ItemBox key={index} onTouchStart={handleTouchItem} tabIndex={0}>
                            <ItemText>{item}</ItemText>
                        </ItemBox>
                    ))}
                </ItemWrapper>
            )}
        </FilterItemContainer>
    );
};

export default React.memo(FilterItem);
