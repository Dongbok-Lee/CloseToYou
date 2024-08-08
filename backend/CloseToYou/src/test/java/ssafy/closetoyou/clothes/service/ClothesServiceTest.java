package ssafy.closetoyou.clothes.service;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;
import ssafy.closetoyou.closet.domain.Closet;
import ssafy.closetoyou.closet.service.port.ClosetRepository;
import ssafy.closetoyou.clothes.controller.port.ClothesService;
import ssafy.closetoyou.clothes.controller.request.ClothesCondition;
import ssafy.closetoyou.clothes.controller.request.ClothesUpdateRequest;
import ssafy.closetoyou.clothes.controller.response.ClothesDetail;
import ssafy.closetoyou.clothes.controller.response.ClothesSummary;
import ssafy.closetoyou.clothes.domain.Clothes;
import ssafy.closetoyou.clothes.domain.Color;
import ssafy.closetoyou.clothes.domain.Pattern;
import ssafy.closetoyou.clothes.service.port.ClothesRepository;
import ssafy.closetoyou.clothes.domain.Type;
import ssafy.closetoyou.global.error.exception.CloseToYouException;

import java.util.ArrayList;
import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class ClothesServiceTest {

    @Autowired
    ClothesService clothesService;

    @MockBean
    ClothesRepository clothesRepository;

    @MockBean
    ClosetRepository closetRepository;

    private Closet cl1, cl2;
    private Clothes c1, c2, c3;
    @BeforeEach
    void setUp() {
        System.out.println("Clothes Service 시작");

        cl1 = Closet.builder().closetId(1L).build();
        cl2 = Closet.builder().closetId(2L).build();

        c1 = Clothes.builder()
                .clothesId(1L)
                .closet(cl1)
                .nfcId(1L)
                .location("A1")
                .nickname("옷 1")
                .type(Type.BOTTOM)
                .pattern(Pattern.ANIMAL)
                .color(Color.PINK)
                .isDeleted(false)
                .build();

        c2 = Clothes.builder()
                .clothesId(2L)
                .closet(cl1)
                .nfcId(2L)
                .location("A2")
                .nickname("옷 2")
                .type(Type.BOTTOM)
                .pattern(Pattern.ANIMAL)
                .color(Color.BEIGE)
                .isDeleted(false)
                .build();

        c3 = Clothes.builder()
                .clothesId(3L)
                .closet(cl2)
                .nfcId(3L)
                .location("A3")
                .nickname("옷 3")
                .type(Type.BOTTOM)
                .pattern(Pattern.ANIMAL)
                .color(Color.BEIGE)
                .isDeleted(false)
                .build();
    }

    @AfterEach
    void tearDown() {
        System.out.println("Clothes Service 종료");
    }

    @Test
    @Transactional
    void 옷의_정보를_변경할_수_있다() throws Exception {

        //given
        Long userId = 1L;
        String newNickname = "변경할 닉네임";
        String newColor = "PINK";
        String newMemo = "내가 좋아하는 옷";

        ClothesUpdateRequest clothesUpdateRequest = ClothesUpdateRequest
                .builder()
                .nickname(newNickname)
                .color(newColor)
                .memo(newMemo)
                .build();

        Mockito.when(clothesRepository.findClothes(1L)).thenReturn(c1);
        Mockito.when(clothesRepository.existClothesByClothesId(c1.getClothesId())).thenReturn(true);

        //when
        clothesService.updateClothes(userId, c1.getClothesId(), clothesUpdateRequest);

        //then
        assertThat(c1.getNickname()).isEqualTo(newNickname);
        assertThat(c1.getColor()).isEqualTo(Color.valueOf(newColor));
        assertThat(c1.getMemo()).isEqualTo(newMemo);
    }

    @Test
    @Transactional
    void 중복되는_닉네임으로_변경할_수_없다() throws Exception {

        //given
        Long userId = 1L;

        ClothesUpdateRequest clothesUpdateRequest = ClothesUpdateRequest
                .builder()
                .nickname(c1.getNickname())
                .color("PINK")
                .memo("내가 좋아하는 옷")
                .build();

        //when & then
        assertThrows(CloseToYouException.class , () -> {
            clothesService.updateClothes(userId, c1.getClothesId(), clothesUpdateRequest);
        });
    }

    @Test
    @Transactional
    void 옷을_삭제할_수_있다() throws Exception {

        //given
        Long clothesId = 1L;

        //when
        Mockito.when(clothesRepository.findClothes(clothesId)).thenReturn(c1);
        Mockito.when(clothesRepository.existClothesByClothesId(clothesId)).thenReturn(true);
        clothesService.removeClothes(clothesId);

        //then
        boolean isDeleted = clothesRepository.findClothes(clothesId).getIsDeleted();
        assertThat(isDeleted).isTrue();
    }


    @Test
    void 아이디_기반으로_옷을_찾을_수_있다() {

        //given
        Long clothesId = 1L;

        //when
        Mockito.when(clothesRepository.existClothesByClothesId(clothesId)).thenReturn(true);
        Mockito.when(clothesRepository.findClothes(clothesId)).thenReturn(c1);

        //given
        assertThat(clothesService.findClothes(clothesId).getNickname()).isEqualTo(c1.getNickname());
    }

    @Test
    void 유저의_전체_옷_조회를_할_수_있다() {

        //given
        Long userId = 1L;

        //when
        Mockito.when(clothesRepository.findAllClothes(userId)).thenReturn(new ArrayList<>(Arrays.asList(c1, c2, c3)));

        //then
        assertThat(clothesService.findAllClothes(userId).size()).isEqualTo(3);
    }

    @Test
    void 필터링_기반_옷_조회를_할_수_있다() {

        //given
        ClothesCondition clothesCondition = ClothesCondition.builder().closetId(0L).color("BEIGE").pattern("ANIMAL").type("BOTTOM").build();

        //when
        Mockito.when(clothesRepository.searchClothesByClothesCondition(clothesCondition)).thenReturn(new ArrayList<>(Arrays.asList(c2, c3)));

        //then
        assertThat(clothesService.searchClothesByClothesCondition(clothesCondition).size()).isEqualTo(2);
    }

    @Test
    void 검색어_기반_옷_조회를_할_수_있다() {

        //given
        String searchKeyword = "옷";

        //when
        Mockito.when(clothesRepository.searchClothesBySearchKeyword(searchKeyword)).thenReturn(new ArrayList<>(Arrays.asList(c1, c2, c3)));

        //then
        assertThat(clothesService.searchClothesBySearchKeyword(searchKeyword).size()).isEqualTo(3);
    }
}