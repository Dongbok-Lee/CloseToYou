package ssafy.closetoyou.clothes.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ssafy.closetoyou.clothes.controller.request.ClothesCondition;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClothesJpaRepository extends JpaRepository<ClothesEntity,Integer> {
    void deleteClothesByClothesId(Long clothesId);
    boolean existsByClothesIdAndIsDeleted(Long clothesId, boolean deleted);
    boolean existsByNicknameAndIsDeleted(String nickname, boolean deleted);
    Optional<ClothesEntity> findClothesByClothesIdAndIsDeleted(Long clothesId, boolean deleted);
    @Query("select c from ClothesEntity c " +
            "where (c.pattern = :#{#clothesCondition.pattern} " +
            "and c.color = :#{#clothesCondition.color} " +
            "and c.type = :#{#clothesCondition.type}) " +
            "and c.isDeleted = false")
    Optional<List<ClothesEntity>> searchClothesByClothesConditionAndIsDeleted(@Param("clothesCondition") ClothesCondition clothesCondition);

    @Query("select c from ClothesEntity c where c.nickname like concat('%', :#{#searchKeyword},'%') and c.isDeleted = false")
    Optional<List<ClothesEntity>> searchClothesBySearchKeywordAndIsDeleted(@Param("searchKeyword") String searchKeyword);

}
