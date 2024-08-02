import ClothesCardStyle from './ClothesCardStyle';

const ClothesCard = ({ onTouchStart }) => {
    return(
        <ClothesCardStyle onTouchStart={ onTouchStart }>
            <div className="clothes-card-icon-box" tabIndex={0}>
                <div className="clothes-card-icon"></div>
            </div>
        </ClothesCardStyle>
    );
}

export default ClothesCard;
