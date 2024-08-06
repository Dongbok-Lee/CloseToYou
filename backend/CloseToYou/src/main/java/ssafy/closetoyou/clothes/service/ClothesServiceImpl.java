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
        Long closetId = closetService.getClosetIdByUserId(userId);

        if (clothesRepository.existClothesByClosetIdAndClothesNickname(closetId, clothesRequest.getNickname())) {
            throw new CloseToYouException(ClothesErrorCode.DUPLICATE_CLOTHES_NICKNAME);
        }

        clothesRequest.setClosetId(closetId);
        Clothes clothes = clothesRequest.toModel();
        return clothesRepository.saveClothes(clothes).getClothesId();
    }

    @Transactional
    @Override
    public void updateClothes(Long userId, Long clothesId, ClothesUpdateRequest clothesUpdateRequest) {
        Long closetId = closetService.getClosetIdByUserId(userId);

        if (!clothesRepository.existClothesByClosetIdAndClothesId(closetId, clothesId)) {
            throw new CloseToYouException(ClothesErrorCode.NO_CLOTHES_EXCEPTION);
        }
        Clothes clothes = clothesRepository.findClothes(closetId, clothesId);
        clothes.changeClothesInfo(clothesUpdateRequest);
        clothesRepository.saveClothes(clothes);
    }

    @Transactional
    @Override
    public void removeClothes(Long userId, Long clothesId) {
        Long closetId = closetService.getClosetIdByUserId(userId);

        if (!clothesRepository.existClothesByClosetIdAndClothesId(closetId, clothesId)) {
            throw new CloseToYouException(ClothesErrorCode.NO_CLOTHES_EXCEPTION);
        }
        clothesRepository.deleteClothes(clothesId);
    }

    @Override
    public ClothesResponse findClothes(Long userId, Long clothesId) {
        Long closetId = closetService.getClosetIdByUserId(userId);

        if (!clothesRepository.existClothesByClosetIdAndClothesId(closetId, clothesId)) {
            throw new CloseToYouException(ClothesErrorCode.NO_CLOTHES_EXCEPTION);
        }
        Clothes clothes = clothesRepository.findClothes(closetId, clothesId);
        return ClothesResponse.fromModel(clothes);
    }

    @Override
    public List<ClothesResponse> findAllClothes(Long userId) {
        Long closetId = closetService.getClosetIdByUserId(userId);

        return clothesRepository.findAllClothes(closetId)
                .stream()
                .map(ClothesResponse::fromModel)
                .toList();
    }

    @Override
    public List<ClothesResponse> searchClothesByClothesCondition(Long userId, ClothesCondition clothesCondition) {
        Long closetId = closetService.getClosetIdByUserId(userId);

        return clothesRepository.searchClothesByClosetIdAndClothesCondition(closetId, clothesCondition)
                .stream()
                .map(ClothesResponse::fromModel)
                .toList();
    }

    @Override
    public List<ClothesResponse> searchClothesBySearchKeyword(Long userId, String searchKeyword) {
        Long closetId = closetService.getClosetIdByUserId(userId);

        return clothesRepository.searchClothesByClosetIdAndSearchKeyword(closetId, searchKeyword)
                .stream()
                .map(ClothesResponse::fromModel)
                .toList();
    }
}
