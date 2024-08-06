package ssafy.closetoyou.clothes.infrastructure;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import ssafy.closetoyou.clothes.controller.request.ClothesCondition;
import ssafy.closetoyou.clothes.domain.Clothes;
import ssafy.closetoyou.clothes.service.port.ClothesRepository;
import ssafy.closetoyou.global.error.errorcode.ClosetErrorCode;
import ssafy.closetoyou.global.error.errorcode.ClothesErrorCode;
import ssafy.closetoyou.global.error.exception.CloseToYouException;

import java.util.Collections;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ClothesRepositoryImpl implements ClothesRepository {

    private final ClothesJpaRepository clothesJpaRepository;

    @Override
    public Clothes saveClothes(Clothes clothes) {
        return clothesJpaRepository.save(ClothesEntity.fromModel(clothes)).toModel();
    }

    @Override
    public void deleteClothes(Long clothesId) {
        ClothesEntity clothesEntity = clothesJpaRepository.findClothesByClosetIdAndClothesIdAndIsDeleted(clothesId, clothesId, false)
                .orElseThrow(() -> new CloseToYouException(ClothesErrorCode.NO_CLOTHES_EXCEPTION));
        clothesEntity.setDeleted(true);
        clothesJpaRepository.save(clothesEntity);
    }

    @Override
    public boolean existClothesByClosetIdAndClothesId(Long closetId, Long clothesId) {
        return clothesJpaRepository.existsByClosetIdAndClothesIdAndIsDeleted(closetId, clothesId, false);
    }

    public boolean existClothesByClosetIdAndClothesNickname(Long closetId, String nickname) {
        return clothesJpaRepository.existsByClosetIdAndNicknameAndIsDeleted(closetId, nickname, false);
    }

    @Override
    public Clothes findClothes(Long closetId, Long clothesId) {
        return clothesJpaRepository.findClothesByClosetIdAndClothesIdAndIsDeleted(closetId, clothesId, false).orElseThrow(
                () -> new CloseToYouException(ClothesErrorCode.NO_CLOTHES_EXCEPTION)).toModel();
    }

    @Override
    public List<Clothes> findAllClothes(Long closetId) {
        return clothesJpaRepository
                .findAllByClosetIdAndIsDeleted(closetId, false)
                .orElseThrow(() -> new CloseToYouException(ClosetErrorCode.NO_CLOSET_EXCEPTION))
                .stream()
                .map(ClothesEntity::toModel)
                .toList();
    }

    @Override
    public List<Clothes> searchClothesByClosetIdAndClothesCondition(Long closetId, ClothesCondition clothesCondition) {
        return clothesJpaRepository
                .searchClothesByClosetIdAndClothesConditionAndIsDeleted(closetId, clothesCondition)
                .orElse(Collections.emptyList())
                .stream()
                .map(ClothesEntity::toModel)
                .toList();
    }

    @Override
    public List<Clothes> searchClothesByClosetIdAndSearchKeyword(Long closetId, String searchKeyword) {
        return clothesJpaRepository
                .searchClothesByClosetIdAndSearchKeywordAndIsDeleted(closetId, searchKeyword)
                .orElse(Collections.emptyList())
                .stream()
                .map(ClothesEntity::toModel)
                .toList();
    }
}
