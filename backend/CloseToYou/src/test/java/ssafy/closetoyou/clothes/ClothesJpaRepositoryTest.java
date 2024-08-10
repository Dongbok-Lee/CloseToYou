package ssafy.closetoyou.clothes;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.stereotype.Repository;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;
import ssafy.closetoyou.closet.domain.Closet;
import ssafy.closetoyou.closet.infrastructure.ClosetEntity;
import ssafy.closetoyou.closet.infrastructure.ClosetJpaRepository;
import ssafy.closetoyou.clothes.controller.request.ClothesCondition;
import ssafy.closetoyou.clothes.domain.Clothes;
import ssafy.closetoyou.clothes.domain.Color;
import ssafy.closetoyou.clothes.domain.Pattern;
import ssafy.closetoyou.clothes.domain.Type;
import ssafy.closetoyou.clothes.infrastructure.ClothesEntity;
import ssafy.closetoyou.clothes.infrastructure.ClothesJpaRepository;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;

import java.util.Collections;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@TestPropertySource(locations = "classpath:application-test.yml")
@DataJpaTest(includeFilters = @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = Repository.class))
@ExtendWith(SpringExtension.class)
@Transactional
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ClothesJpaRepositoryTest {

    @Autowired
    private ClothesJpaRepository clothesJpaRepository;

    @Autowired
    private ClosetJpaRepository closetJpaRepository;

    private Closet fakeCloset;
    private final String fakeNickname = "닉네임";
    private final Color fakeColor = Color.BLACK;
    private final Type fakeType = Type.CARDIGAN;
    private final Pattern fakePattern = Pattern.STRIPE;
    private final String fakeLocation = "A1";
    private final Long fakeUserId = 1L;
    private final Long fakeClothesId = 1L;

    @BeforeEach
    void setUp() {
        fakeCloset = Closet.builder().userId(fakeUserId).nickname("옷장 닉네임").closetCode("A1B2C3").build();
        fakeCloset = closetJpaRepository.save(ClosetEntity.fromModel(fakeCloset)).toModel();
    }

    @Test
    @DisplayName("DB에 옷을 저장할 수 있다.")
    void saveClothesToDatabase() throws Exception {
        //given
        Clothes clothes = new Clothes(fakeClothesId, fakeCloset, fakeLocation, fakeNickname, fakeType, fakePattern, fakeColor);
        ClothesEntity clothesEntity = ClothesEntity.fromModel(clothes);

        //when
        ClothesEntity savedClothes = clothesJpaRepository.save(clothesEntity);

        //then
        assertNotNull(savedClothes);
        assertThat(savedClothes.getNickname()).isEqualTo(fakeNickname);
    }

    @Test
    @DisplayName("옷 아이디로 존재 여부를 확인할 수 있다.")
    void shouldReturnTrueWhenClothesExistsById() {
        //given
        Clothes clothes = new Clothes(fakeClothesId, fakeCloset, fakeLocation, fakeNickname, fakeType, fakePattern, fakeColor, false);
        ClothesEntity clothesEntity = ClothesEntity.fromModel(clothes);

        //when
        ClothesEntity savedClothes = clothesJpaRepository.save(clothesEntity);

        //then
        assertThat(clothesJpaRepository.existsByClothesIdAndIsDeleted(savedClothes.getClothesId(), false)).isTrue();
    }

    @Test
    @DisplayName("삭제된 옷의 경우, 특정 아이디의 옷이 옷장에 존재하지 않다고 반환한다.")
    void shouldReturnFalseWhenClothesIsDeletedById() {
        //given
        Clothes clothes = new Clothes(fakeClothesId, fakeCloset, fakeLocation, fakeNickname, fakeType, fakePattern, fakeColor, true);
        ClothesEntity clothesEntity = ClothesEntity.fromModel(clothes);

        //when
        ClothesEntity savedClothes = clothesJpaRepository.save(clothesEntity);

        //then
        assertThat(clothesJpaRepository.existsByClothesIdAndIsDeleted(savedClothes.getClothesId(), false)).isFalse();
    }

    @Test
    @DisplayName("해당 유저의 특정 닉네임을 가진 옷 보유 여부를 확인할 수 있다.")
    void shouldReturnTrueWhenClothesExistsByUserIdAndNickname() {
        //given
        Clothes clothes = new Clothes(fakeClothesId, fakeCloset, fakeLocation, fakeNickname, fakeType, fakePattern, fakeColor, false);
        ClothesEntity clothesEntity = ClothesEntity.fromModel(clothes);

        //when
        clothesJpaRepository.save(clothesEntity);

        //then
        assertThat(clothesJpaRepository.existsByUserIdAndNicknameAndIsDeleted(fakeUserId, fakeNickname, false)).isTrue();
    }

    @Test
    @DisplayName("삭제된 옷의 경우, 특정 닉네임을 가진 옷이 해당 유저의 옷장에 존재하지 않다고 반환한다.")
    void shouldReturnFalseWhenClothesIsDeletedAndUserIdAndNickname() {
        //given
        Clothes clothes = new Clothes(fakeClothesId, fakeCloset, fakeLocation, fakeNickname, fakeType, fakePattern, fakeColor, true);
        ClothesEntity clothesEntity = ClothesEntity.fromModel(clothes);

        //when
        ClothesEntity savedClothes = clothesJpaRepository.save(clothesEntity);

        //then
        assertThat(clothesJpaRepository.existsByUserIdAndNicknameAndIsDeleted(fakeUserId, fakeNickname, false)).isFalse();
    }

    @Test
    @DisplayName("아이디를 기반으로 옷을 조회할 수 있다.")
    void findClothesById() {
        //given
        Clothes clothes = new Clothes(fakeClothesId, fakeCloset, fakeLocation, fakeNickname, fakeType, fakePattern, fakeColor, false);
        ClothesEntity clothesEntity = ClothesEntity.fromModel(clothes);

        //when
        Long savedClothesId = clothesJpaRepository.save(clothesEntity).getClothesId();

        //then
        assertThat(clothesJpaRepository.findClothesByClothesIdAndIsDeleted(savedClothesId, false).getClothesId()).isEqualTo(savedClothesId);
    }

    @Test
    @DisplayName("모든 옷을 조회할 수 있다.")
    void findAllClothesByUserId() {
        //given
        Clothes clothes1 = new Clothes(1L, fakeCloset, fakeLocation, "a", fakeType, fakePattern, fakeColor, false);
        Clothes clothes2 = new Clothes(2L, fakeCloset, fakeLocation, "b", fakeType, fakePattern, fakeColor, false);
        Clothes clothes3 = new Clothes(3L, fakeCloset, fakeLocation, "c", fakeType, fakePattern, fakeColor, true);

        //when
        clothesJpaRepository.save(ClothesEntity.fromModel(clothes1));
        clothesJpaRepository.save(ClothesEntity.fromModel(clothes2));
        clothesJpaRepository.save(ClothesEntity.fromModel(clothes3));

        //then
        assertThat(clothesJpaRepository.findAllByUserIdAndIsDeleted(fakeUserId, false).orElse(Collections.emptyList())).hasSize(2);
    }

    @Test
    @DisplayName("조건에 따라 옷을 검색할 수 있다.")
    void searchClothesByCondition() {
        //given
        Clothes clothes1 = new Clothes(1L, fakeCloset, fakeLocation, fakeNickname, Type.COAT, Pattern.DOT, Color.BEIGE, false);
        Clothes clothes2 = new Clothes(2L, fakeCloset, fakeLocation, fakeNickname, Type.COAT, Pattern.DOT, Color.RED, false);
        Clothes clothes3 = new Clothes(3L, fakeCloset, fakeLocation, fakeNickname, Type.COAT, Pattern.DOT, Color.RED, false);
        Clothes clothes4 = new Clothes(4L, fakeCloset, fakeLocation, fakeNickname, Type.COAT, Pattern.DOT, Color.BEIGE, false);
        Clothes clothes5 = new Clothes(4L, fakeCloset, fakeLocation, fakeNickname, Type.COAT, Pattern.DOT, Color.RED, true);

        //when
        clothesJpaRepository.save(ClothesEntity.fromModel(clothes1));
        clothesJpaRepository.save(ClothesEntity.fromModel(clothes2));
        clothesJpaRepository.save(ClothesEntity.fromModel(clothes3));
        clothesJpaRepository.save(ClothesEntity.fromModel(clothes4));
        clothesJpaRepository.save(ClothesEntity.fromModel(clothes5));

        //then
        assertThat(clothesJpaRepository.searchClothesByClosetIdAndClothesConditionAndIsDeleted(ClothesCondition.builder()
                .closetId(fakeCloset.getClosetId())
                .color("RED")
                .type("COAT")
                .build(), false)
                .orElse(Collections.emptyList())
        ).hasSize(2);
    }

    @Test
    @DisplayName("검색 키워드에 따라 옷을 검색할 수 있다.")
    void searchClothesBySearchKeyword() {
        //given
        Clothes clothes1 = new Clothes(1L, fakeCloset, fakeLocation, "닉네임", Type.COAT, Pattern.DOT, Color.BEIGE, false);
        Clothes clothes2 = new Clothes(2L, fakeCloset, fakeLocation, "ㄴ", Type.COAT, Pattern.DOT, Color.RED, false);
        Clothes clothes3 = new Clothes(3L, fakeCloset, fakeLocation, "네", Type.COAT, Pattern.DOT, Color.RED, false);
        Clothes clothes4 = new Clothes(4L, fakeCloset, fakeLocation, "임", Type.COAT, Pattern.DOT, Color.BEIGE, false);

        //when
        clothesJpaRepository.save(ClothesEntity.fromModel(clothes1));
        clothesJpaRepository.save(ClothesEntity.fromModel(clothes2));
        clothesJpaRepository.save(ClothesEntity.fromModel(clothes3));
        clothesJpaRepository.save(ClothesEntity.fromModel(clothes4));

        //then
        assertThat(clothesJpaRepository.searchClothesByUserIdAndSearchKeywordAndIsDeleted("네", false).orElse(Collections.emptyList())).hasSize(2);
    }

    @Test
    @DisplayName("특정 옷장의 옷의 개수를 구할 수 있다.")
    void countClothesByClosetId() {
        //given
        Clothes clothes1 = new Clothes(1L, fakeCloset, fakeLocation, "닉네임", Type.COAT, Pattern.DOT, Color.BEIGE, false);
        Clothes clothes2 = new Clothes(2L, fakeCloset, fakeLocation, "ㄴ", Type.COAT, Pattern.DOT, Color.RED, false);
        Clothes clothes3 = new Clothes(3L, fakeCloset, fakeLocation, "네", Type.COAT, Pattern.DOT, Color.RED, false);

        //when
        clothesJpaRepository.save(ClothesEntity.fromModel(clothes1));
        clothesJpaRepository.save(ClothesEntity.fromModel(clothes2));
        clothesJpaRepository.save(ClothesEntity.fromModel(clothes3));

        //then
        assertThat(clothesJpaRepository.countClothesByClosetIdAndIsDeleted(fakeCloset.getClosetId(), false)).isEqualTo(3);
    }
}