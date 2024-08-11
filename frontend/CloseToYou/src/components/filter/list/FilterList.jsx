import React, {useCallback, useState} from "react";

import FilterItem from "../item/FilterItem.jsx";
import {FilterItemWrapper, FilterListContainer, FilterOpenTextWrapper} from "./FilterListStyle.js";

const FilterList = ({isOpen, setIsOpen}) => {
    const [isOpenFilterItem, setIsOpenFilterItem] = useState({
        옷장: false,
        색상: false,
        종류: false,
        패턴: false,
    });

    const handleClickShowFilterList = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, [setIsOpen]);

    return (
        <FilterListContainer>
            <FilterOpenTextWrapper>
                <p className="not-active-text" tabIndex={0}>
                    필터
                </p>
                <p className={isOpen ? "active-text" : "not-active-text underline"} onClick={handleClickShowFilterList}
                   tabIndex={0}>
                    {isOpen ? "접기" : "펼치기"}
                </p>
            </FilterOpenTextWrapper>
            {isOpen && (
                <FilterItemWrapper>
                    {["옷장", "색상", "종류", "패턴"].map((item) => (
                        <FilterItem
                            key={item}
                            title={item}
                            isOpen={isOpenFilterItem}
                            setIsOpen={setIsOpenFilterItem}
                            setIsDisabled={setIsOpen}
                        />
                    ))}
                </FilterItemWrapper>
            )}
        </FilterListContainer>
    );
};

export default FilterList;
