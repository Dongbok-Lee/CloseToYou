import ClothesCardStyle from "./ClothesCardStyle";

const ClothesCard = ({ handleTouchClothesCard, type, color }) => {
  const iconUrl = `/src/assets/icons/clothes/${type}/${color}.png`;

  return (
    <ClothesCardStyle onTouchStart={handleTouchClothesCard} iconUrl={iconUrl}>
      <div 
        className="clothesCardIconBox" 
        tabIndex={0} 
        aria-label={`${type} - ${color}`}
      >
        <div className="clothesCardIcon"></div>
      </div>
    </ClothesCardStyle>
  );
}

export default ClothesCard;
