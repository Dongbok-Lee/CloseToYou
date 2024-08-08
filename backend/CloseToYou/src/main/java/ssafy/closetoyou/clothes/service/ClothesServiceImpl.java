package ssafy.closetoyou.clothes.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.closetoyou.closet.controller.port.ClosetService;
import ssafy.closetoyou.closet.controller.response.ClosetResponse;
import ssafy.closetoyou.closet.domain.Closet;
import ssafy.closetoyou.closet.service.port.ClosetRepository;
import ssafy.closetoyou.clothes.controller.port.ClothesService;
import ssafy.closetoyou.clothes.controller.request.ClothesUpdateRequest;
import ssafy.closetoyou.clothes.controller.response.ClothesDetail;
import ssafy.closetoyou.clothes.controller.request.ClothesCondition;
import ssafy.closetoyou.clothes.controller.response.ClothesSummary;
import ssafy.closetoyou.clothes.domain.Clothes;
import ssafy.closetoyou.clothes.service.port.ClothesRepository;
import ssafy.closetoyou.global.error.errorcode.ClothesErrorCode;
import ssafy.closetoyou.global.error.exception.CloseToYouException;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ClothesServiceImpl implements ClothesService {

    private final ClothesRepository clothesRepository;

    @Transactional
    @Override
    public void updateClothes(Long userId,
                              Long clothesId,
                              ClothesUpdateRequest clothesUpdateRequest) {

        String nickname = clothesUpdateRequest.getNickname();
        if (!clothesRepository.existClothesByClothesId(clothesId)) {
            throw new CloseToYouException(ClothesErrorCode.NO_CLOTHES_EXCEPTION);
        }

        if (nickname != null && clothesRepository.existClothesByUserIdAndClothesNickname(userId, nickname)) {
            throw new CloseToYouException(ClothesErrorCode.DUPLICATE_CLOTHES_NICKNAME);
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
        Clothes clothes = clothesRepository.findClothes(clothesId);
        clothes.delete();
        clothesRepository.saveClothes(clothes);
    }

    @Override
    public ClothesDetail findClothes(Long clothesId) {

        if (!clothesRepository.existClothesByClothesId(clothesId)) {
            throw new CloseToYouException(ClothesErrorCode.NO_CLOTHES_EXCEPTION);
        }

        Clothes clothes = clothesRepository.findClothes(clothesId);
        return ClothesDetail.fromModel(clothes);
    }

    @Override
    public List<ClothesSummary> findAllClothes(Long userId) {
        return clothesRepository.findAllClothes(userId)
                .stream()
                .map(ClothesSummary::fromModel)
                .toList();
    }

    @Override
    public List<ClothesSummary> searchClothesByClothesCondition(ClothesCondition clothesCondition) {
        return clothesRepository.searchClothesByClothesCondition(clothesCondition)
                .stream()
                .map(ClothesSummary::fromModel)
                .toList();
    }

    @Override
    public List<ClothesSummary> searchClothesBySearchKeyword(String searchKeyword) {

        return clothesRepository.searchClothesBySearchKeyword(searchKeyword)
                .stream()
                .map(ClothesSummary::fromModel)
                .toList();
    }
}