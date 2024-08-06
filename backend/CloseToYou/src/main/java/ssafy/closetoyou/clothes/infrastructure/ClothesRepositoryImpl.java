package ssafy.closetoyou.clothes.infrastructure;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import ssafy.closetoyou.clothes.controller.request.ClothesCondition;
import ssafy.closetoyou.clothes.domain.Clothes;
import ssafy.closetoyou.clothes.service.port.ClothesRepository;
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
    public Clothes deleteClothes(Long clothesId) {
        return clothesJpaRepository.findClothesByClothesIdAndIsDeleted(clothesId, false)
                .orElseThrow(() -> new CloseToYouException(ClothesErrorCode.NO_CLOTHES_EXCEPTION))
                .toModel();
    }

    @Override
    public boolean existClothesByClothesId(Long clothesId) {
        return clothesJpaRepository.existsByClothesIdAndIsDeleted(clothesId, false);
    }

    @Override
    public boolean existClothesByUserIdAndClothesNickname(Long userId, String clothesNickname) {
        return clothesJpaRepository.existsByUserIdAndNicknameAndIsDeleted(userId, clothesNickname, false);
    }


    @Override
    public Clothes findClothes(Long clothesId) {
        return clothesJpaRepository.findClothesByClothesIdAndIsDeleted(clothesId, false).orElseThrow(
                () -> new CloseToYouException(ClothesErrorCode.NO_CLOTHES_EXCEPTION)).toModel();
    }

    @Override
    public List<Clothes> findAllClothes(Long userId) {
        return clothesJpaRepository
                .findAllByUserIdAndIsDeleted(userId, false)
                .stream()
                .map(ClothesEntity::toModel)
                .toList();
    }

    @Override
    public List<Clothes> searchClothesByClosetIdAndClothesCondition(Long closetId, ClothesCondition clothesCondition) {
        return clothesJpaRepository
                .searchClothesByClosetIdAndClothesConditionAndIsDeleted(closetId, clothesCondition)
                .stream()
                .map(ClothesEntity::toModel)
                .toList();
    }

    @Override
    public List<Clothes> searchClothesByUserIdAndSearchKeyword(Long userId, String searchKeyword) {
        return clothesJpaRepository
                .searchClothesByUserIdAndSearchKeywordAndIsDeleted(userId, searchKeyword)
                .orElse(Collections.emptyList())
                .stream()
                .map(ClothesEntity::toModel)
                .toList();
    }
}
