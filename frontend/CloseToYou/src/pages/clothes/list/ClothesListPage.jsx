import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSwipeable} from 'react-swipeable';
import {
  ClothesCardWrapper,
  ClothesListPageContainer,
  InfoWrapper,
  Nickname,
  NoClothesText,
  PageContainer,
  SwipeContainer,
  Title,
} from './ClothesListPageStyle';
import FloatingButton from '../../../components/floatingbutton/FloatingButton';
import ClothesCard from '../../../components/clothescard/ClothesCard';
import FilterList from "../../../components/filter/list/FilterList.jsx";

const ClothesListPage = () => {
    const [clothes, setClothes] = useState([
        {
            id: 0,
            nickname: '산뜻 노랑',
            color: 'yellow',
            type: 'shirt',
            pattern: '무지',
        },
        {
            id: 1,
            nickname: '시원한 블루',
            color: 'blue',
            type: 'skirt',
            pattern: '체크',
        },
        {
            id: 2,
            nickname: '따뜻한 레드',
            color: 'red',
            type: 'jumper',
            pattern: '무지',
        },
        {
            id: 3,
            nickname: '부드러운 그린',
            color: 'green',
            type: 'cardigan',
            pattern: '무지',
        },
        {
            id: 4,
            nickname: '클래식 블랙',
            color: 'black',
            type: 'jacket',
            pattern: '무지',
        },
    ]);

    const [totalClothes, setTotalClothes] = useState(clothes.length);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [lastTouchedIndex, setLastTouchedIndex] = useState(null);
    const listRef = useRef(null);

    const navigate = useNavigate();

    const handleFilterChange = (e) => {
        const {name, value} = e.target;
        setFilters((prevFilters) => ({...prevFilters, [name]: value}));
        const filteredClothes = clothes.filter((clothing) =>
            Object.keys(filters).every((key) => !filters[key] || clothing[key] === filters[key])
        );
        setTotalClothes(filteredClothes.length);
    };

    const handleTouchDelete = () => {
        const updatedClothes = clothes.filter((_, index) => index !== activeIndex);
        setClothes(updatedClothes);
        setTotalClothes(updatedClothes.length);
        setActiveIndex((prevIndex) => Math.max(0, prevIndex - 1));
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % clothes.length);
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + clothes.length) % clothes.length);
    };

    const handlers = useSwipeable({
        onSwipedLeft: handleNext,
        onSwipedRight: handlePrev,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    useEffect(() => {
        const container = listRef.current;
        if (!container) return;

        const handleScroll = () => {
            if (container) {
                const middleIndex = Math.round((container.scrollLeft + container.offsetWidth / 2 - 125) / (container.scrollWidth / clothes.length));
                setActiveIndex(middleIndex % clothes.length);
            }
        };

        container.addEventListener('scroll', handleScroll);

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [clothes.length]);

    useEffect(() => {
        console.log(`Active card ID: ${clothes[activeIndex]?.id}`);
    }, [activeIndex, clothes]);

    const handleTouchNfc = () => {
        navigate(`/clothes/nfc`);
    };

    const handleTouchClothesCard = (id, index) => {
        if (index === activeIndex) {
            if (lastTouchedIndex === index) {
                navigate(`/clothes/${id}`);
            } else {
                console.log(`Touched card ID: ${id}`);
                setLastTouchedIndex(index);
            }
        }
    };

    return (
        <ClothesListPageContainer className="page">
            <PageContainer>
                <InfoWrapper>
                    <FilterList isOpen={isFilterOpen} setIsOpen={setIsFilterOpen}/>
                    <Title>
                        전체 옷 개수: <span>{totalClothes}</span>
                    </Title>
                </InfoWrapper>
                {clothes.length === 0 ? (
                    <NoClothesText>등록된 옷이 없습니다.</NoClothesText>
                ) : (
                    <SwipeContainer
                        {...handlers}
                        id="clothes-list"
                        ref={listRef}
                    >
                        {clothes.map((clothing, index) => (
                            <ClothesCardWrapper key={index} isActive={index === activeIndex}>
                                <ClothesCard
                                    handleTouchClothesCard={() => handleTouchClothesCard(clothing.id, index)}
                                    type={clothing.type}
                                    color={clothing.color}
                                />
                                <Nickname isActive={index === activeIndex}>{clothing.nickname}</Nickname>
                            </ClothesCardWrapper>
                        ))}
                    </SwipeContainer>
                )}
                <FloatingButton type="delete" onTouchStart={handleTouchDelete}>
                    Delete
                </FloatingButton>
                <FloatingButton type="nfc" onTouchStart={handleTouchNfc}>
                    NFC
                </FloatingButton>
            </PageContainer>
        </ClothesListPageContainer>
    );
};

export default ClothesListPage;
