package ssafy.closetoyou.clothes.controller.port;
import ssafy.closetoyou.clothes.controller.response.ClothesResponse;
import ssafy.closetoyou.clothes.domain.ClothesRequestDto;
import ssafy.closetoyou.clothes.domain.SearchFilter;

import java.util.List;
import java.util.Optional;

public interface ClothesService {
    Long addClothes(ClothesRequestDto clothesRequestDto);
    Long updateClothes(ClothesRequestDto clothesRequestDto);
    Long updateClothesLocation(ClothesRequestDto clothesRequestDto);
    Long deleteClothes(Long clothesId);

    Optional<ClothesResponse> findClothes(Long clothesId);
    Optional<List<ClothesResponse>> findAllClothes();
    Optional<List<ClothesResponse>> searchClothesBySearchFilter(SearchFilter searchFilter);
    Optional<List<ClothesResponse>> searchClothesBySearchKeyword(String searchKeyword);
}
