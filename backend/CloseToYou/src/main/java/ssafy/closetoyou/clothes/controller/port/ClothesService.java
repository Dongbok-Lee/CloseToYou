package ssafy.closetoyou.clothes.controller.port;
import ssafy.closetoyou.clothes.controller.request.ClothesUpdateRequest;
import ssafy.closetoyou.clothes.controller.response.ClothesResponse;
import ssafy.closetoyou.clothes.controller.request.ClothesRequest;
import ssafy.closetoyou.clothes.controller.request.ClothesCondition;

import java.util.List;

public interface ClothesService {
    Long addClothes(Long userId, ClothesRequest clothesRequest);
    void updateClothes(Long clothesId, ClothesUpdateRequest clothesUpdateRequest);
    void removeClothes(Long clothesId);

    ClothesResponse findClothes(Long clothesId);
    List<ClothesResponse> findAllClothes();
    List<ClothesResponse> searchClothesByClothesCondition(ClothesCondition clothesCondition);
    List<ClothesResponse> searchClothesBySearchKeyword(String searchKeyword);
}
