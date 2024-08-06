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
    boolean existsByClothesIdAndIsDeleted(Long clothesId, boolean deleted);
    @Query("SELECT EXISTS (" +
            "SELECT 1 " +
            "FROM ClothesEntity c " +
            "JOIN ClosetEntity cl ON c.closetId = cl.closetId " +
            "WHERE cl.userId = :userId " +
            "AND c.nickname = :nickname " +
            "AND c.isDeleted = :isDeleted )")
    boolean existsByUserIdAndNicknameAndIsDeleted(@Param("userId") Long userId,
                                                  @Param("nickname") String nickname,
                                                  @Param("isDeleted") boolean isDeleted);

    Optional<ClothesEntity> findClothesByClothesIdAndIsDeleted(Long clothesId, boolean deleted);

    @Query("SELECT c " +
            "FROM ClothesEntity c " +
            "JOIN ClosetEntity cl ON c.closetId = cl.closetId " +
            "WHERE cl.userId = :userId " +
            "AND c.isDeleted = :isDeleted " +
            "ORDER BY c.wearingCount DESC")
    List<ClothesEntity> findAllByUserIdAndIsDeleted(@Param("userId") Long userId,
                                                    @Param("isDeleted") boolean isDeleted);

    @Query("select c from ClothesEntity c " +
            "where (:#{#clothesCondition.pattern} is null or c.pattern = :#{#clothesCondition.pattern}) " +
            "and (:#{#clothesCondition.color} is null or :#{#clothesCondition.color} = '' or c.color = :#{#clothesCondition.color}) " +
            "and (:#{#clothesCondition.type} is null or c.type = :#{#clothesCondition.type}) " +
            "and c.isDeleted = false " +
            "and (:closetId = 0 or c.closetId = :closetId) " +
            "ORDER BY c.wearingCount DESC")
    List<ClothesEntity> searchClothesByClosetIdAndClothesConditionAndIsDeleted(@Param("closetId") Long closetId,
                                                                              @Param("clothesCondition") ClothesCondition clothesCondition);

    @Query("SELECT c " +
            "FROM ClothesEntity c " +
            "JOIN ClosetEntity cl ON c.closetId = cl.closetId " +
            "WHERE cl.userId = :userId " +
            "AND c.nickname LIKE concat('%', :searchKeyword,'%') " +
            "AND c.isDeleted = false " +
            "ORDER BY c.wearingCount DESC ")
    Optional<List<ClothesEntity>> searchClothesByUserIdAndSearchKeywordAndIsDeleted(@Param("userId") Long userId,
                                                                                    @Param("searchKeyword") String searchKeyword);

    int countClothesByClosetIdAndIsDeleted(Long ClosetId, boolean isDeleted);
}
