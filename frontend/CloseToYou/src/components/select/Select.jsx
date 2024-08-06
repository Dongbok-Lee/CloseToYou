import { useState } from 'react'

import SelectStyle from './SelectStyle';

const Select = ({ initItem }) => {

    const items = ["빨간색", "노란색", "주황색", "초록색", "파란색", "보라색", "갈색"];

    const [ isTouched, setIsTouched ] = useState(false);
    const [selectedItem, setSelectedItem] = useState(initItem);
    const [ isFocused, setIsFocused ] = useState(false);

    const handleTouchSelectBox = () => {
        setIsTouched(true);

        setTimeout(() => {
            setIsFocused(true);
        }, 50)
    }

    const handleTouchOption = (item) => {
        setSelectedItem(item);

        setIsTouched(false);

        setTimeout(() => {
            setIsFocused(false);
        }, 50)
    }

    return(
        <SelectStyle isFocused={ isFocused }>
            <div className="select-up-box" onTouchStart={ handleTouchSelectBox } tabIndex={0}>
                <div className="select-up-title">{ selectedItem }</div>
                <div className="select-up-icon-box">
                    <div className="select-up-icon"></div>
                </div>
            </div>  
            <div className="select-down-box">
                <ul className="select-list">
                    {items.map((item, index) => (
                        <li className="select-list-item" key={ index } onTouchStart={() => handleTouchOption(item) } tabIndex={0}>{ item }</li>
                    ))}
                </ul>
            </div>
        </SelectStyle>
    );
}

export default Select;
