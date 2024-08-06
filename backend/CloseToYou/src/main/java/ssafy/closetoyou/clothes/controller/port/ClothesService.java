package ssafy.closetoyou.clothes.controller.port;
import ssafy.closetoyou.clothes.controller.request.ClothesUpdateRequest;
import ssafy.closetoyou.clothes.controller.response.ClothesResponse;
import ssafy.closetoyou.clothes.controller.request.ClothesRequest;
import ssafy.closetoyou.clothes.controller.request.ClothesCondition;

import java.util.List;

public interface ClothesService {
    Long addClothes(Long closetId, ClothesRequest clothesRequest);
    void updateClothes(Long closetId, Long clothesId, ClothesUpdateRequest clothesUpdateRequest);
    void removeClothes(Long closetId, Long clothesId);

    ClothesResponse findClothes(Long userId, Long clothesId);
    List<ClothesResponse> findAllClothes(Long userId);
    List<ClothesResponse> searchClothesByClothesCondition(Long userId, ClothesCondition clothesCondition);
    List<ClothesResponse> searchClothesBySearchKeyword(Long userId, String searchKeyword);
}
