/* eslint-disable no-useless-catch */
import { authClientInstance } from "../utils/http-client";

// 옷 검색하는 함수 getSearchedClothes
export const getSearchedClothes = async keyword => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await authClientInstance.get(`/api/clothes/search/${keyword}`);
    return response;
  } catch (error) {
    throw error;
  }
};

//옷 전체 조회하는 함수 getClothes
export const getClothes = async () => {
  const { data, status } = await authClientInstance.get("/clothes/");
  return { data, status };
};

//옷 삭제하는 함수
export const deleteClothes = async clothesId => {
  const { data, status } = await authClientInstance.delete(`/clothes/${clothesId}`);
  return { data, status };
};

// 옷 정보 수정하는 함수 patchClothes
export const patchClothes = async (clothesId, clothesData) => {
  try {
    const response = await authClientInstance.patch(`/api/clothes/${clothesId}`, clothesData);
    return response;
  } catch (error) {
    throw error;
  }
};

// 특정 옷을 ID로 조회하는 함수 getClothesById 추가
export const getClothesById = async clothesId => {
  try {
    const response = await authClientInstance.get(`/api/clothes/${clothesId}`);
    console.log("response", response);
    return response;
  } catch (error) {
    throw error;
  }
};

// NFC로 상세 조회하는 함수 getClothesByNfc
export const getClothesByNfc = async nfcId => {
  try {
    const response = await authClientInstance.get(`/api/clothes/nfc/${nfcId}`);
    return response;
  } catch (error) {
    throw error;
  }
};
