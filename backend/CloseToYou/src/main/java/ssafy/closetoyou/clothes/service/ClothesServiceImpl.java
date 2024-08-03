package ssafy.closetoyou.clothes.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.closetoyou.closet.controller.port.ClosetService;
import ssafy.closetoyou.clothes.controller.port.ClothesService;
import ssafy.closetoyou.clothes.controller.request.ClothesUpdateRequest;
import ssafy.closetoyou.clothes.controller.response.ClothesResponse;
import ssafy.closetoyou.clothes.controller.request.ClothesRequest;
import ssafy.closetoyou.clothes.controller.request.ClothesCondition;
import ssafy.closetoyou.clothes.domain.Clothes;
import ssafy.closetoyou.clothes.service.port.ClothesRepository;
import ssafy.closetoyou.global.error.errorcode.ClothesErrorCode;
import ssafy.closetoyou.global.error.exception.CloseToYouException;

import java.util.List;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ClothesServiceImpl implements ClothesService {

    private final ClothesRepository clothesRepository;
    private final ClosetService closetService;

    @Transactional
    @Override
    public Long addClothes(Long userId, ClothesRequest clothesRequest) {
        if (clothesRepository.existClothesByClothesNickname(clothesRequest.getNickname())) {
            throw new CloseToYouException(ClothesErrorCode.DUPLICATE_CLOTHES_NICKNAME);
        }
        Long closetId = closetService.getClosetIdByUserId(userId);
        clothesRequest.setClosetId(closetId);
        return clothesRepository.saveClothes(clothesRequest.toModel()).getClothesId();
    }

    @Transactional
    @Override
    public void updateClothes(Long clothesId, ClothesUpdateRequest clothesUpdateRequest) {
        if (!clothesRepository.existClothesByClothesId(clothesId)) {
            throw new CloseToYouException(ClothesErrorCode.NO_CLOTHES_EXCEPTION);
        }
        Clothes clothes = clothesRepository.findClothes(clothesId);
        clothes.changeClothesInfo(clothesUpdateRequest);
        clothesRepository.saveClothes(clothes);
    }

    @Transactional
    @Override
    public void removeClothes(Long clothesId) {
        if (!clothesRepository.existClothesByClothesId(clothesId)) {
            throw new CloseToYouException(ClothesErrorCode.NO_CLOTHES_EXCEPTION);
        }
        clothesRepository.deleteClothes(clothesId);
    }

    @Override
    public ClothesResponse findClothes(Long clothesId) {
        if (!clothesRepository.existClothesByClothesId(clothesId)) {
            throw new CloseToYouException(ClothesErrorCode.NO_CLOTHES_EXCEPTION);
        }
        Clothes clothes = clothesRepository.findClothes(clothesId);
        return ClothesResponse.fromModel(clothes);
    }

    @Override
    public List<ClothesResponse> findAllClothes() {
        return clothesRepository.findAllClothes()
                .stream()
                .map(ClothesResponse::fromModel)
                .toList();
    }

    @Override
    public List<ClothesResponse> searchClothesByClothesCondition(ClothesCondition clothesCondition) {
        return clothesRepository.searchClothesByClothesCondition(clothesCondition)
                .stream()
                .map(ClothesResponse::fromModel)
                .toList();
    }

    @Override
    public List<ClothesResponse> searchClothesBySearchKeyword(String searchKeyword) {
        return clothesRepository.searchClothesBySearchKeyword(searchKeyword)
                .stream()
                .map(ClothesResponse::fromModel)
                .toList();
    }
}
