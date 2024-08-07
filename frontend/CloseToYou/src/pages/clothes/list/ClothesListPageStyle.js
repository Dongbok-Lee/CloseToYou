import styled from '@emotion/styled';
import FloatingButton from '../../../components/floatingbutton/FloatingButton';

export const ClothesListPageContainer = styled.div`
  width: 85%;
`;

export const PageContainer = styled.div`
  padding-top: 1.5rem;
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  margin-bottom: 20px;
  text-align: right;

  span {
    color: #FF6969;
  }
`;

export const Filters = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

export const FilterSelect = styled.select`
  padding: 10px;
  font-size: 1rem;
  max-width: 25%;
`;

export const SwipeContainer = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  max-width: 95%;
  min-height: 330px;
  -webkit-overflow-scrolling: touch;
  position: relative;
  padding-left: calc(50% - 125px); /* 반절 보이도록 설정 (카드 너비의 절반) */
  padding-right: calc(50% - 125px); /* 반절 보이도록 설정 (카드 너비의 절반) */

  &::-webkit-scrollbar {
    display: none;
  }

  & > div {
    scroll-snap-align: center;
    flex: 0 0 auto;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    position: relative;
  }
`;

export const ClothesCardWrapper = styled.div`
  margin-right: 20px;
  transform: ${props => props.isActive ? 'translate(0, 20px)' : 'translate(0, 0)'};
  transition: transform 0.2s ease-in-out;
`;

export const ClothesCard = styled.div`
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-right: 10px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};
`;

export const Image = styled.img`
  width: 100%;
  border-radius: 8px;
`;

export const Nickname = styled.div`
  margin-top: 10px;
  font-size: 1.2rem;
  text-align: center;
  visibility: ${(props) => (props.isActive ? 'visible' : 'hidden')};
`;

export const FloatingButtonMove = styled(FloatingButton)`
  display: block;
  margin: 20px auto 0 auto;
  padding: 10px 20px;
  background-color: #FF6969;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const NoClothesText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 300px);
  font-size: 1.5rem;
  color: gray;
`;

export const FixedContainer = styled.div`
  position: fixed;
  bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 10;
`;

export default ClothesListPageContainer;
