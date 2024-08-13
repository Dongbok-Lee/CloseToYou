import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ClothesEditPageContainer,
  ClothesNameText,
  TabText,
  DetailContainer,
  DetailItem,
  DetailTitleText,
  ButtonWrapper,
  ImageContainer,
  LocationInputContainer,
} from "./ClothesEditPageStyle";
import TextArea from "../../../components/textarea/Textarea";
import TextInput from "../../../components/textinput/TextInput";
import Button from "../../../components/button/Button";
import Select from "../../../components/select/Select";
import tempImage from "../../../assets/icons/temp-image.png";
import { patchClothes, getClothesById } from "../../../api/clothes";
import { filterLabels } from "../../../constants/filter";
import useClothesStore from "../../../stores/clothes";

const convertToEnglish = (type, value) => {
  const labelType = filterLabels[type];
  if (!labelType) return value;

  for (const [key, label] of Object.entries(labelType)) {
    if (label === value) {
      return key;
    }
  }

  return value;
};

const ClothesEditPage = () => {
  const [initialData, setInitialData] = useState({});
  const [nickname, setNickname] = useState("");
  const [closetNickname, setClosetNickname] = useState(""); // closetNickname 상태 추가
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [pattern, setPattern] = useState("");
  const [size, setSize] = useState("");
  const [season, setSeason] = useState("");
  const [memo, setMemo] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState(tempImage);
  const [lastWornDate, setLastWornDate] = useState("");

  const { clothes, loadClothesDetail } = useClothesStore();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadClothesDetail(id);
  }, [id, loadClothesDetail]);

  useEffect(() => {
    if (clothes) {
      const defaultNickname = clothes.nickname
        ? clothes.nickname
        : `${filterLabels.color[clothes.color] || ""} ${filterLabels.category[clothes.type] || ""}`;

      setNickname(defaultNickname);
      setClosetNickname(clothes.closetNickname || "");
      setColor(filterLabels.color[clothes.color] || "");
      setType(filterLabels.category[clothes.type] || "");
      setPattern(filterLabels.pattern[clothes.pattern] || "");
      setSize(clothes.size || "");
      setSeason(filterLabels.season[clothes.season] || "");
      setMemo(clothes.memo || "");
      setLocation(clothes.location || "");
      setImageUrl(clothes.imageUrl || tempImage);
      setLastWornDate(clothes.lastWornDate || "");
    }
  }, [clothes]);

  const handleSave = async () => {
    const updatedClothes = {};

    if (nickname !== initialData.nickname) {
      updatedClothes.nickname = nickname;
    }

    if (color !== initialData.color) {
      updatedClothes.color = convertToEnglish("color", color);
    }

    if (type !== initialData.type) {
      updatedClothes.type = convertToEnglish("category", type);
    }
    if (pattern !== initialData.pattern) {
      updatedClothes.pattern = convertToEnglish("pattern", pattern);
    }
    if (size !== initialData.size) {
      updatedClothes.size = size;
    }
    if (season !== initialData.season) {
      updatedClothes.season = convertToEnglish("season", season);
    }
    if (memo !== initialData.memo) {
      updatedClothes.memo = memo;
    }

    if (Object.keys(updatedClothes).length === 0) {
      console.log("변경사항이 없습니다.");
      return;
    }

    try {
      console.log("서버로 전송할 데이터:", updatedClothes);
      await patchClothes(id, updatedClothes);
      console.log("데이터 전송 성공");
      navigate(`/clothes/${id}`);
    } catch (error) {
      console.error("옷 정보 수정 실패:", error);
    }
  };

  return (
    <ClothesEditPageContainer className="page">
      <ClothesNameText>
        <TextInput
          textInputPlaceholder="옷 별명 입력"
          aria-label="옷 별명 입력"
          textInputValue={nickname}
          handleChangeTextInput={e => setNickname(e.target.value)}
        />
      </ClothesNameText>
      <ImageContainer>
        <img src={imageUrl} alt="옷 이미지" />
      </ImageContainer>
      <LocationInputContainer>
        <DetailTitleText>
          {closetNickname ? `${closetNickname} ${location}` : location}
        </DetailTitleText>
      </LocationInputContainer>

      <DetailContainer>
        <TabText aria-label="기본 정보">기본 정보</TabText>
        <DetailItem>
          <DetailTitleText aria-label="색상">색상</DetailTitleText>
          <Select initItem={color} type="color" onChange={item => setColor(item)} />
        </DetailItem>
        <DetailItem>
          <DetailTitleText aria-label="종류">종류</DetailTitleText>
          <Select initItem={type} type="type" onChange={item => setType(item)} />
        </DetailItem>
        <DetailItem>
          <DetailTitleText aria-label="패턴">패턴</DetailTitleText>
          <Select initItem={pattern} type="pattern" onChange={item => setPattern(item)} />
        </DetailItem>
      </DetailContainer>

      <DetailContainer>
        <TabText aria-label="추가 정보">추가 정보</TabText>
        <DetailItem>
          <DetailTitleText aria-label="사이즈">사이즈</DetailTitleText>
          <TextInput
            textInputPlaceholder="사이즈 입력"
            textInputSize="small"
            textInputValue={size}
            handleChangeTextInput={e => setSize(e.target.value)}
            aria-label="사이즈 입력"
          />
        </DetailItem>
        <DetailItem>
          <DetailTitleText aria-label="계절감">계절감</DetailTitleText>
          <Select initItem={season} type="season" onChange={item => setSeason(item)} />
        </DetailItem>
      </DetailContainer>

      <DetailContainer>
        <TabText aria-label="메모">메모</TabText>
        <DetailItem>
          <TextArea
            initItem={memo}
            textareaPlaceholder="최대 50자까지 입력 가능합니다."
            onChange={value => setMemo(value)}
          />
        </DetailItem>
      </DetailContainer>

      <ButtonWrapper>
        <Button btnColor="primary" handleTouchButton={handleSave} aria-label="수정 완료 버튼">
          수정 완료
        </Button>
      </ButtonWrapper>
    </ClothesEditPageContainer>
  );
};

export default ClothesEditPage;
