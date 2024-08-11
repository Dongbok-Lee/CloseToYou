import styled from '@emotion/styled';
import { colors } from '../../../constants/colors';
import TextInput from '../../../components/textinput/TextInput';

export const ClothesEditPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

export const ClothesNameText = styled.h1`
  margin: 30px;
  color: ${colors.point[0]};
  font-family: "KoddiUD OnGothic";
  font-size: 1.5rem;
  font-weight: 700;
`;

export const TabText = styled.div`
  width: 9.375rem;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 2.5rem;
  background: ${colors.point[0]};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.text[1]};
  font-family: "KoddiUD OnGothic";
  font-size: 1.25rem;
  font-weight: 700;
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
  margin: 1rem auto;
`;

export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

export const DetailTitleText = styled.h2`
  color: ${colors.text[0]};
  text-align: left;
  font-family: "KoddiUD OnGothic";
  font-size: 1.25rem;
  font-weight: 700;
`;

export const ImageContainer = styled.div`
  border: 1px solid ${colors.point[0]};
  height: 15.6rem;
  width: 15.6rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: ${colors.background[0]};
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LocationInputContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const TextInputStyled = styled(TextInput)`
  text-align: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  margin: 20px;
  width: 90%;
`;

export default ClothesEditPageContainer;
