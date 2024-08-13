import ClothesCardStyle from "./ClothesCardStyle";
import { filterLabels } from "../../constants/filter.js";

const ClothesCard = ({ handleTouchClothesCard, type, color }) => {
  // 한글로 전달된 type과 color를 영어로 변환
  const englishType = Object.keys(filterLabels.category).find(
    key => filterLabels.category[key] === type,
  );
  const englishColor = Object.keys(filterLabels.color).find(
    key => filterLabels.color[key] === color,
  );

  // 변환된 값으로 iconUrl 생성
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
