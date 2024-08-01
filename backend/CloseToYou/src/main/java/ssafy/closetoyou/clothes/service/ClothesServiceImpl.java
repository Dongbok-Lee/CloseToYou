package ssafy.closetoyou.clothes.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.closetoyou.clothes.controller.port.ClothesService;
import ssafy.closetoyou.clothes.controller.response.ClothesResponse;
import ssafy.closetoyou.clothes.domain.ClothesRequestDto;
import ssafy.closetoyou.clothes.domain.SearchFilter;
import ssafy.closetoyou.clothes.service.port.ClothesRepository;

import java.util.List;
import java.util.Optional;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ClothesServiceImpl implements ClothesService {
    @Override
    public Long addClothes(ClothesRequestDto clothesRequestDto) {
        return 0L;
    }

    @Override
    public Long updateClothes(ClothesRequestDto clothesRequestDto) {
        return 0L;
    }

    @Override
    public Long updateClothesLocation(ClothesRequestDto clothesRequestDto) {
        return 0L;
    }

    @Override
    public Long deleteClothes(Long clothesId) {
        return 0L;
    }

    @Override
    public Optional<ClothesResponse> findClothes(Long clothesId) {
        return Optional.empty();
    }

    @Override
    public Optional<List<ClothesResponse>> findAllClothes() {
        return Optional.empty();
    }

    @Override
    public Optional<List<ClothesResponse>> searchClothesBySearchFilter(SearchFilter searchFilter) {
        return Optional.empty();
    }

    @Override
    public Optional<List<ClothesResponse>> searchClothesBySearchKeyword(String searchKeyword) {
        return Optional.empty();
    }
}
