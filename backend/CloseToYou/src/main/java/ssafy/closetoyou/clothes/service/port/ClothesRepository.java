package ssafy.closetoyou.clothes.service.port;

import ssafy.closetoyou.clothes.controller.request.ClothesCondition;
import ssafy.closetoyou.clothes.domain.Clothes;

import java.util.List;

public interface ClothesRepository {
    Clothes saveClothes(Clothes clothes);
    Clothes deleteClothes(Long clothesId);

    boolean existClothesByClothesId(Long clothesId);
    boolean existClothesByUserIdAndClothesNickname(Long userId, String clothesNickname);

    Clothes findClothes(Long clothesId);
    List<Clothes> findAllClothes(Long userId);
    List<Clothes> searchClothesByClosetIdAndClothesCondition(Long closetId, ClothesCondition clothesCondition);
    List<Clothes> searchClothesByClosetIdAndSearchKeyword(Long closetId, String searchKeyword);
}
