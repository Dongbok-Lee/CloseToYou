import {
  ClosetDetailPageContainer,
  NicknameBox,
  ClosetNickname,
  WeatherWrapper,
  WeatherText,
  WeatherApiWrapper,
  ClosetClothesText,
  WeatherImg,
  WeatherTemp,
  ClosetContentWrapper,
  ClosetConditionWrapper,
  ClosetTemp,
  ClosetHumi,
} from "./ClosetsDetailPageStyle";
import { useClosetsStore } from "../../../stores/closet";
import { useParams } from "react-router-dom";

const ClosetsDetailPage = () => {
  const { closets } = useClosetsStore();

  const params = useParams();
  const closetId = parseInt(params.id, 10);

  return (
    <ClosetDetailPageContainer className="page">
      <NicknameBox>
        {closets.map((item, index) => (
          <ClosetNickname key={index} tabIndex={0}>
            {closetId === item.closetId && item.nickname}
          </ClosetNickname>
        ))}
      </NicknameBox>
      <WeatherWrapper>
        <WeatherText>오늘의 날씨</WeatherText>
        <WeatherApiWrapper>
          <WeatherImg src="src/assets/icons/etc/sun.svg" alt="맑음"></WeatherImg>
          <WeatherTemp>28℃</WeatherTemp>
        </WeatherApiWrapper>
      </WeatherWrapper>
      <ClosetContentWrapper>
        {closets.map((item, index) => (
          <ClosetClothesText key={index} tabIndex={0}>
            {closetId === item.closetId && `보유 옷 개수 : ${item.clothesCount}개`}
          </ClosetClothesText>
        ))}
        <ClosetConditionWrapper>
          <ClosetTemp>옷장의 온도: 20°C </ClosetTemp>
          <ClosetHumi>옷장의 습도: 40%</ClosetHumi>
        </ClosetConditionWrapper>
      </ClosetContentWrapper>
    </ClosetDetailPageContainer>
  );
};

export default ClosetsDetailPage;
