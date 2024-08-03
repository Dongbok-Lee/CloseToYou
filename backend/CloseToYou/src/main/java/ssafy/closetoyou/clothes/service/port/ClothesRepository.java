package ssafy.closetoyou.clothes.service.port;

import ssafy.closetoyou.clothes.controller.request.ClothesCondition;
import ssafy.closetoyou.clothes.domain.Clothes;

import java.util.List;

public interface ClothesRepository {
    Clothes saveClothes(Clothes clothes);
    void deleteClothes(Long clothesId);

    boolean existClothesByClothesId(Long clothesId);
    boolean existClothesByClothesNickname(String clothesNickname);

    Clothes findClothes(Long clothesId);
    List<Clothes> findAllClothes();
    List<Clothes> searchClothesByClothesCondition(ClothesCondition clothesCondition);
    List<Clothes> searchClothesBySearchKeyword(String searchKeyword);
}