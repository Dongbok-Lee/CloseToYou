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
    boolean existsByClosetIdAndClothesIdAndIsDeleted(Long closetId, Long clothesId, boolean deleted);
    boolean existsByClosetIdAndNicknameAndIsDeleted(Long closetId, String nickname, boolean deleted);
    Optional<ClothesEntity> findClothesByClosetIdAndClothesIdAndIsDeleted(Long closetId, Long clothesId, boolean deleted);
    Optional<List<ClothesEntity>> findAllByClosetIdAndIsDeleted(Long closetId, boolean deleted);

    @Query("select c from ClothesEntity c " +
            "where (:#{#clothesCondition.pattern} is null or c.pattern = :#{#clothesCondition.pattern}) " +
            "and (:#{#clothesCondition.color} is null or :#{#clothesCondition.color} = '' or c.color = :#{#clothesCondition.color}) " +
            "and (:#{#clothesCondition.type} is null or c.type = :#{#clothesCondition.type}) " +
            "and c.isDeleted = false " +
            "and c.closetId = :#{#closetId}")
    Optional<List<ClothesEntity>> searchClothesByClosetIdAndClothesConditionAndIsDeleted(@Param("closetId") Long closetId,
                                                                              @Param("clothesCondition") ClothesCondition clothesCondition);


    @Query("select c from ClothesEntity c where c.nickname like concat('%', :#{#searchKeyword},'%') " +
            "and c.isDeleted = false " +
            "and c.closetId = :#{#closetId}")
    Optional<List<ClothesEntity>> searchClothesByClosetIdAndSearchKeywordAndIsDeleted(@Param("closetId") Long closetId,
                                                                                      @Param("searchKeyword") String searchKeyword);

}
