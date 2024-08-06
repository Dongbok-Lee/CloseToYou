package ssafy.closetoyou.clothes.controller.port;
import ssafy.closetoyou.clothes.controller.request.ClothesUpdateRequest;
import ssafy.closetoyou.clothes.controller.response.ClothesDetail;
import ssafy.closetoyou.clothes.controller.request.ClothesCondition;
import ssafy.closetoyou.clothes.controller.response.ClothesSummary;

import java.util.List;

public interface ClothesService {
    void updateClothes(Long userId, Long clothesId, ClothesUpdateRequest clothesUpdateRequest);
    void removeClothes(Long clothesId);

    ClothesDetail findClothes(Long clothesId);
    List<ClothesSummary> findAllClothes(Long userId);
    List<ClothesSummary> searchClothesByClothesCondition(Long userId, ClothesCondition clothesCondition);
    List<ClothesSummary> searchClothesBySearchKeyword(Long userId, String searchKeyword);
}
