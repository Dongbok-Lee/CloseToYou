import CardStyle from './CardStyle';

const Card = ({ cardType, onTouchStart, bookmarkName }) => {
    return (
        <CardStyle cardType={ cardType } onTouchStart={ onTouchStart } tabIndex={0}>
            <div className="card-icon-box">
                { cardType !== 'text' && <div className="card-icon"></div>}
                { cardType === 'text' && <div className="card-text">{ bookmarkName }</div>}
            </div>
        </CardStyle>
    );
}

export default Card;
