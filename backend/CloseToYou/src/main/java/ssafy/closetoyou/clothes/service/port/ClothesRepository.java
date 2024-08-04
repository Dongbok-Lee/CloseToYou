package ssafy.closetoyou.clothes.service.port;

import ssafy.closetoyou.clothes.controller.request.ClothesCondition;
import ssafy.closetoyou.clothes.domain.Clothes;

import java.util.List;

public interface ClothesRepository {
    Clothes saveClothes(Clothes clothes);
    void deleteClothes(Long clothesId);

    boolean existClothesByClosetIdAndClothesId(Long closetId, Long clothesId);
    boolean existClothesByClosetIdAndClothesNickname(Long closetId, String clothesNickname);

    Clothes findClothes(Long closetId, Long clothesId);
    List<Clothes> findAllClothes(Long closetId);
    List<Clothes> searchClothesByClosetIdAndClothesCondition(Long closetId, ClothesCondition clothesCondition);
    List<Clothes> searchClothesByClosetIdAndSearchKeyword(Long closetId, String searchKeyword);
}
