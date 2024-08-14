import ClothesCardStyle from "./ClothesCardStyle";
import { filterLabels } from "../../constants/filter.js";

const ClothesCard = ({ handleTouchClothesCard, type, color }) => {
  const englishType = Object.keys(filterLabels.category).find(
    key => filterLabels.category[key] === type,
  );
  const englishColor = Object.keys(filterLabels.color).find(
    key => filterLabels.color[key] === color,
  );

  const iconUrl = `/src/assets/icons/clothes/${englishType}/${englishColor}.png`;

  return (
    <ClothesCardStyle onTouchStart={handleTouchClothesCard} iconUrl={iconUrl}>
      <div className="clothesCardIconBox" tabIndex={0} aria-label={`${type} - ${color}`}>
        <div className="clothesCardIcon"></div>
      </div>
    </ClothesCardStyle>
  );
};

export default ClothesCard;
