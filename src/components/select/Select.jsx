import SelectStyle from './SelectStyle';

const Select = ({ children }) => {

    const items = ["빨간색", "노란색", "주황색", "초록색", "파란색", "보라색", "갈색"];

    return(
        <SelectStyle>
            <div className="select-up-box" tabIndex={0}>
                <div className="select-up-title">{ children }</div>
                <div className="select-up-icon-box">
                    <div className="select-up-icon"></div>
                </div>
            </div>  
            <div className="select-down-box">
                <ul className="select-list">
                    {items.map((item, index) => (
                        <li className="select-list-item" key={ index } tabIndex={0}>{ item }</li>
                    ))}
                </ul>
            </div>
        </SelectStyle>
    );
}

export default Select;
