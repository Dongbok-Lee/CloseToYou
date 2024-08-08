package ssafy.closetoyou.clothes.infrastructure;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import ssafy.closetoyou.closet.domain.Closet;
import ssafy.closetoyou.clothes.domain.Clothes;
import ssafy.closetoyou.clothes.domain.Color;
import ssafy.closetoyou.clothes.domain.Pattern;
import ssafy.closetoyou.clothes.domain.Type;
import ssafy.closetoyou.clothes.service.port.ClothesRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest @AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ClothesRepositoryTest {

    @Autowired
    ClothesRepository clothesRepository;

    @Test
    void saveClothes() {
        //given
        Clothes clothes = Clothes.builder()
                .color(Color.BEIGE)
                .pattern(Pattern.DOT)
                .type(Type.COAT)
                .nickname("옷 닉네임")
                .nfcId(1L)
                .closet(Closet.builder().closetId(1L).build())
                .build();

        //when
        Clothes saveClothes = clothesRepository.saveClothes(clothes);

        //then
        assertNotNull(saveClothes);
        assertThat(clothes.getClothesId()).isEqualTo(saveClothes.getClothesId());
        assertThat(clothes.getNickname()).isEqualTo(saveClothes.getNickname());
    }

    @Test
    void existClothesByClothesId() {

        //given
        Long clothesId = 1L;


    }

    @Test
    void existClothesByUserIdAndClothesNickname() {
    }

    @Test
    void findClothes() {
    }

    @Test
    void findAllClothes() {
    }

    @Test
    void searchClothesByClothesCondition() {
    }

    @Test
    void searchClothesBySearchKeyword() {
    }
}