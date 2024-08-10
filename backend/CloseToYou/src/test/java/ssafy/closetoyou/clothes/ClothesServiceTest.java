package ssafy.closetoyou.clothes;

import org.junit.jupiter.api.DisplayName;
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
import ssafy.closetoyou.clothes.controller.request.ClothesRequest;
import ssafy.closetoyou.clothes.controller.request.ClothesUpdateRequest;
import ssafy.closetoyou.clothes.domain.*;
import ssafy.closetoyou.clothes.service.port.ClothesRepository;
import ssafy.closetoyou.global.error.exception.CloseToYouException;

import java.util.ArrayList;
import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@Transactional
class ClothesServiceTest {

    @Autowired
    ClothesService clothesService;

    @MockBean
    ClothesRepository clothesRepository;

    @MockBean
    ClosetRepository closetRepository;

    private final String fakeNickname = "닉네임";
    private final Color fakeColor = Color.BLACK;
    private final Type fakeType = Type.CARDIGAN;
    private final Pattern fakePattern = Pattern.STRIPE;
    private final String fakeLocation = "A1";
    private final String fakeImageUrl = "tt";
    private final Long userId = 1L;
    private final Long clothesId = 1L;
    private final Long closetId = 1L;

    @Test
    @DisplayName("옷을 생성할 수 있다.")
    void addClothes() throws Exception {
        //given
        Closet closet = Closet.builder().nickname("옷장 닉네임").closetCode("A1B2C3").build();
        ClothesRequest clothesRequest = new ClothesRequest(fakeType, fakePattern, fakeColor, fakeLocation, closetId, fakeImageUrl);
        Clothes clothes =  new Clothes(clothesId, closet, fakeLocation, fakeNickname, fakeType, fakePattern, fakeColor);

        //when
        Mockito.when(clothesRepository.saveClothes(any(Clothes.class))).thenReturn(clothes);

        //then
        Long clothesId = clothesService.addClothes(clothesRequest);
        assertThat(clothesId).isEqualTo(clothes.getClothesId());
    }

    @Test
    @DisplayName("중복되는 닉네임으로 변경할 수 없다.")
    void updateClothesDuplicateNickname() throws Exception {
        //given
        Closet closet = Closet.builder().nickname("옷장 닉네임").closetCode("A1B2C3").build();
        Clothes clothes =  new Clothes(clothesId, closet, fakeLocation, fakeNickname, fakeType, fakePattern, fakeColor);
        ClothesUpdateRequest clothesUpdateRequest = ClothesUpdateRequest.builder().nickname(fakeNickname).build();

        //when
        Mockito.when(clothesRepository.existClothesByClothesId(clothesId)).thenReturn(true);
        Mockito.when(clothesRepository.existClothesByUserIdAndClothesNickname(userId, clothesUpdateRequest.getNickname())).thenReturn(true);
        Mockito.when(clothesRepository.findClothesByClothesId(clothesId)).thenReturn(clothes);

        //then
        assertThrows(CloseToYouException.class , () -> {
            clothesService.updateClothes(userId, clothes.getClothesId(), clothesUpdateRequest);
        });
    }

    @Test
    @DisplayName("옷을 삭제할 수 있다.")
    void removeClothes() throws Exception {
        //given
        Closet closet = Closet.builder().nickname("옷장 닉네임").closetCode("A1B2C3").build();
        Clothes clothes =  new Clothes(clothesId, closet, fakeLocation, fakeNickname, fakeType, fakePattern, fakeColor);

        //when
        Mockito.when(clothesRepository.existClothesByClothesId(clothesId)).thenReturn(true);
        Mockito.when(clothesRepository.findClothesByClothesId(clothesId)).thenReturn(clothes);
        clothesService.removeClothes(clothesId);

        //then
        assertThat(clothes.getIsDeleted()).isTrue();
    }

    @Test
    @DisplayName("아이디 기반 옷을 조회할 수 있다")
    void findClothesByClothesId() throws Exception {
        //given
        Closet closet = Closet.builder().nickname("옷장 닉네임").closetCode("A1B2C3").build();
        Clothes clothes =  new Clothes(clothesId, closet, fakeLocation, fakeNickname, fakeType, fakePattern, fakeColor);

        //when
        Mockito.when(clothesRepository.existClothesByClothesId(clothesId)).thenReturn(true);
        Mockito.when(clothesRepository.findClothesByClothesId(clothesId)).thenReturn(clothes);

        //given
        assertThat(clothesService.findClothes(clothesId).getClothesId()).isEqualTo(clothesId);
        assertThat(clothesService.findClothes(clothesId).getNickname()).isEqualTo(clothes.getNickname());
    }

    @Test
    @DisplayName("유저의 전체 옷 조회를 할 수 있다.")
    void findAllClothesByUserId() throws Exception {
        //given
        Closet closet = Closet.builder().userId(userId).nickname("옷장 닉네임").closetCode("A1B2C3").build();
        Clothes clothes1 =  new Clothes(1L, closet, fakeLocation, fakeNickname + "1", fakeType, fakePattern, fakeColor);
        Clothes clothes2 =  new Clothes(2L, closet, fakeLocation, fakeNickname + "2", fakeType, fakePattern, fakeColor);

        //when
        Mockito.when(clothesRepository.findAllClothes(userId)).thenReturn(new ArrayList<>(Arrays.asList(clothes1, clothes2)));

        //then
        assertThat(clothesService.findAllClothes(userId).size()).isEqualTo(2);
    }

    @Test
    @DisplayName("필터링 기반의 옷 조회를 할 수 있다.")
    void searchClothesByClothesCondition() throws Exception {
        //given
        Closet closet1 = Closet.builder().userId(userId).nickname("옷장 닉네임1").closetCode("A1B2C3").build();
        Closet closet2 = Closet.builder().userId(userId).nickname("옷장 닉네임2").closetCode("A1B2C3").build();
        Clothes clothes1 =  new Clothes(1L, closet1, fakeLocation, fakeNickname + "1", fakeType, fakePattern, fakeColor);
        Clothes clothes2 =  new Clothes(2L, closet2, fakeLocation, fakeNickname + "2", fakeType, fakePattern, fakeColor);
        ClothesCondition clothesCondition = ClothesCondition.builder().closetId(0L).color(String.valueOf(fakeColor)).pattern(String.valueOf(fakePattern)).build();

        //when
        Mockito.when(clothesRepository.searchClothesByClothesCondition(clothesCondition)).thenReturn(new ArrayList<>(Arrays.asList(clothes1, clothes2)));

        //then
        assertThat(clothesService.searchClothesByClothesCondition(clothesCondition).size()).isEqualTo(2);
    }

    @Test
    void 검색어_기반_옷_조회를_할_수_있다() {
        //given
        String searchKeyword = "닉";
        Closet closet = Closet.builder().userId(userId).nickname("옷장 닉네임").closetCode("A1B2C3").build();
        Clothes clothes1 =  new Clothes(1L, closet, fakeLocation, fakeNickname + "1", fakeType, fakePattern, fakeColor);
        Clothes clothes2 =  new Clothes(2L, closet, fakeLocation, fakeNickname + "2", fakeType, fakePattern, fakeColor);
        Clothes clothes3 =  new Clothes(3L, closet, fakeLocation, fakeNickname + "3", fakeType, fakePattern, fakeColor);

        //when
        Mockito.when(clothesRepository.searchClothesBySearchKeyword(searchKeyword)).thenReturn(new ArrayList<>(Arrays.asList(clothes1, clothes2, clothes3)));

        //then
        assertThat(clothesService.searchClothesBySearchKeyword(searchKeyword).size()).isEqualTo(3);
    }
}