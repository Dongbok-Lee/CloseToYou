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
    public Long saveClothes(Clothes clothes) {
        return clothesJpaRepository.save(ClothesEntity.fromModel(clothes)).toModel().getClothesId();
    }

    @Override
    public void deleteClothes(Long clothesId) {
        clothesJpaRepository.deleteClothesByClothesId(clothesId);
    }

    @Override
    public boolean existClothes(Long clothesId) {
        return clothesJpaRepository.existsByClothesIdAndIsDeleted(clothesId, false);
    }

    @Override
    public boolean existNickname(String nickname) {
        return clothesJpaRepository.existsByNicknameAndIsDeleted(nickname, false);
    }

    @Override
    public Clothes findClothes(Long clothesId) {
        return clothesJpaRepository.findClothesByClothesIdAndIsDeleted(clothesId, false).orElseThrow(
                () -> new CloseToYouException(ClothesErrorCode.NO_CLOTHES_EXCEPTION)).toModel();
    }

    @Override
    public List<Clothes> findAllClothes() {
        return clothesJpaRepository
                .findAll()
                .stream()
                .map(ClothesEntity::toModel)
                .toList();
    }

    @Override
    public List<Clothes> searchClothesByClothesCondition(ClothesCondition clothesCondition) {
        return clothesJpaRepository
                .searchClothesByClothesConditionAndIsDeleted(clothesCondition)
                .orElse(Collections.emptyList())
                .stream()
                .map(ClothesEntity::toModel)
                .toList();
    }

    @Override
    public List<Clothes> searchClothesBySearchKeyword(String searchKeyword) {
        return clothesJpaRepository
                .searchClothesBySearchKeywordAndIsDeleted(searchKeyword)
                .orElse(Collections.emptyList())
                .stream()
                .map(ClothesEntity::toModel)
                .toList();
    }
}
