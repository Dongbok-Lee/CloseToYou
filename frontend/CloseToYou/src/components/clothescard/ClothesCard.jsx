import ClothesCardStyle from "./ClothesCardStyle";

const ClothesCard = ({ handleTouchClothesCard, type, color }) => {
  const iconUrl = `https://i11b201.p.ssafy.io/assets/icons/clothes/${type.toLowerCase()}/${color.toLowerCase()}.png`;

  return (
    <ClothesCardStyle onTouchStart={handleTouchClothesCard} iconUrl={iconUrl}>
      <div className="clothesCardIconBox" tabIndex={0} aria-label={`${type} - ${color}`}>
        <div className="clothesCardIcon"></div>
      </div>
    </ClothesCardStyle>
  );
};

export default ClothesCard;
