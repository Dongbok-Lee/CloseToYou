package ssafy.closetoyou.clothes.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.closetoyou.closet.controller.port.ClosetService;
import ssafy.closetoyou.closet.controller.response.ClosetResponse;
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
    private final ClosetService closetService;

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

        Clothes clothes = clothesRepository.deleteClothes(clothesId);
        clothes.setIsDeleted(true);
        clothesRepository.saveClothes(clothes);
    }

    @Override
    public ClothesDetail findClothes(Long clothesId) {

        if (!clothesRepository.existClothesByClothesId(clothesId)) {
            throw new CloseToYouException(ClothesErrorCode.NO_CLOTHES_EXCEPTION);
        }

        Clothes clothes = clothesRepository.findClothes(clothesId);
        return ClothesDetail.fromModel(clothes, closetService.getClosetNicknameByClosetId(clothes.getClosetId()));
    }

    @Override
    public List<ClothesSummary> findAllClothes(Long userId) {
        List<ClosetResponse> closetIds = closetService.getUserClosets(userId);
        List<ClothesSummary> clothesSummaries = new ArrayList<>();

        for (Long closetId: closetIds.stream().map(ClosetResponse::getClosetId).toList()) {
            clothesSummaries.addAll(
                    clothesRepository.findAllClothes(closetId)
                            .stream()
                            .map((clothes) -> ClothesSummary.fromModel(clothes, closetService.getClosetNicknameByClosetId(clothes.getClosetId())))
                            .toList()
            );
        }
        return clothesSummaries;
    }

    @Override
    public List<ClothesSummary> searchClothesByClothesCondition(Long userId, ClothesCondition clothesCondition) {
        Long closetId = clothesCondition.getClosetId();
        return clothesRepository.searchClothesByClosetIdAndClothesCondition(closetId, clothesCondition)
                .stream()
                .map((clothes) -> ClothesSummary.fromModel(clothes, closetService.getClosetNicknameByClosetId(clothes.getClosetId())))
                .toList();
    }

    @Override
    public List<ClothesSummary> searchClothesBySearchKeyword(Long userId, String searchKeyword) {

        return clothesRepository.searchClothesByUserIdAndSearchKeyword(userId, searchKeyword)
                .stream()
                .map((clothes) -> ClothesSummary.fromModel(clothes, closetService.getClosetNicknameByClosetId(clothes.getClosetId())))
                .toList();
    }
}
