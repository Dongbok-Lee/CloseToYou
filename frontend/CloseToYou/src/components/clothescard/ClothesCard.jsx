import ClothesCardStyle from './ClothesCardStyle';

const ClothesCard = ( handleTouchClothesCard ) => {

    return(
        <ClothesCardStyle onTouchStart={ handleTouchClothesCard }>
            <div className="clothes-card-icon-box" tabIndex={0}>
                <div className="clothes-card-icon"></div>
            </div>
        </ClothesCardStyle>
    );
}

export default ClothesCard;
