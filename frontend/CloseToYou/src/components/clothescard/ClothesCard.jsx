import ClothesCardStyle from "./ClothesCardStyle";

const ClothesCard = ({ handleTouchClothesCard, type, color }) => {
  const iconUrl = `/src/assets/icons/clothes/${type}/${color}.png`;

  return (
    <ClothesCardStyle onTouchStart={handleTouchClothesCard} iconUrl={iconUrl}>
      <div className="clothes-card-icon-box" tabIndex={0}>
        <div className="clothes-card-icon"></div>
      </div>
    </ClothesCardStyle>
  );
}

export default ClothesCard;
