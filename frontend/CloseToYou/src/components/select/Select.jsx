import React, { useState, useRef } from 'react';
import SelectStyle from './SelectStyle';

const Select = ({ initItem, type }) => {
  const categories = {
    color: ["빨간색", "주황색", "노란색", "초록색", "파란색", "남색", "보라색", "분홍색", "갈색", "검정색", "회색", "흰색", "베이지색"],
    pattern: ["무지", "체크", "도트", "스트라이프", "꽃무늬", "기타"],
    type: ["블라우스", "가디건", "코트", "자켓", "점퍼", "셔츠", "스웨터", "티셔츠", "조끼", "원피스", "점프슈트"],
    season: ["봄", "여름", "가을", "겨울"],
  };

  const items = categories[type] || [];
  const [selectedItem, setSelectedItem] = useState(initItem);
  const selectRef = useRef(null);

  const handleChange = (event) => {
    setSelectedItem(event.target.value);
  };

  return (
    <SelectStyle>
      <select 
        ref={selectRef} 
        value={selectedItem} 
        onChange={handleChange} 
        aria-label={`${type} 선택`}
      >
        {items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </SelectStyle>
  );
};

export default Select;
