package ssafy.closetoyou.clothes.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.closetoyou.clothes.controller.port.ClothesService;
import ssafy.closetoyou.clothes.controller.request.ClothesUpdateRequest;
import ssafy.closetoyou.clothes.controller.response.ClothesResponse;
import ssafy.closetoyou.clothes.controller.request.ClothesRequest;
import ssafy.closetoyou.clothes.controller.request.ClothesCondition;
import ssafy.closetoyou.clothes.domain.Clothes;
import ssafy.closetoyou.clothes.infrastructure.ClothesEntity;
import ssafy.closetoyou.clothes.service.port.ClothesRepository;
import ssafy.closetoyou.global.error.errorcode.ClothesErrorCode;
import ssafy.closetoyou.global.error.exception.CloseToYouException;

import java.util.Collections;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ClothesServiceImpl implements ClothesService {

    private final ClothesRepository clothesRepository;

    @Transactional
    @Override
    public Long addClothes(ClothesRequest clothesRequest) {
        if (clothesRepository.existClothesNickname(clothesRequest.getNickname())) {
            throw new CloseToYouException(ClothesErrorCode.DUPLICATE_CLOTHES_NICKNAME);
        }
        Clothes clothes = clothesRequest.toModel();
        clothesRepository.saveClothes(clothes);
        return clothes.getClothesId();
    }

    @Transactional
    @Override
    public Long updateClothes(Long clothesId, ClothesUpdateRequest clothesUpdateRequest) {
        Clothes clothes = findClothesByClothesId(clothesId);
        clothes.changeClothesInfo(clothesUpdateRequest);
        clothesRepository.saveClothes(clothes);
        return clothes.getClothesId();
    }

    @Transactional
    @Override
    public Long removeClothes(Long clothesId) {
        if (!clothesRepository.existClothes(clothesId)) {
            throw new CloseToYouException(ClothesErrorCode.NO_CLOTHES_EXCEPTION);
        }
        clothesRepository.deleteClothes(clothesId);
        return clothesId;
    }

    @Override
    public ClothesResponse findClothes(Long clothesId) {
        Clothes clothes = clothesRepository.findClothes(clothesId)
                .orElseThrow(() -> new CloseToYouException(ClothesErrorCode.NO_CLOTHES_EXCEPTION));
        return ClothesResponse.fromModel(clothes);
    }

    @Override
    public List<ClothesResponse> findAllClothes() {
        return clothesRepository.findAllClothes()
                .orElse(Collections.emptyList())
                .stream()
                .map(ClothesResponse::fromModel)
                .toList();
    }

    @Override
    public List<ClothesResponse> searchClothesByClothesCondition(ClothesCondition clothesCondition) {
        return clothesRepository.searchClothesByClothesCondition(clothesCondition)
                .orElse(Collections.emptyList())
                .stream()
                .map(ClothesResponse::fromModel)
                .toList();
    }

    @Override
    public List<ClothesResponse> searchClothesBySearchKeyword(String searchKeyword) {
        return clothesRepository.searchClothesBySearchKeyword(searchKeyword)
                .orElse(Collections.emptyList())
                .stream()
                .map(ClothesResponse::fromModel)
                .toList();
    }

    private Clothes findClothesByClothesId(Long clothesId) {
        return clothesRepository.findClothes(clothesId).orElseThrow(() -> new CloseToYouException(ClothesErrorCode.NO_CLOTHES_EXCEPTION));
    }
}
