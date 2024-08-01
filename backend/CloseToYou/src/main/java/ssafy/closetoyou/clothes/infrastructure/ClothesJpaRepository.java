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
    void deleteClothesById(Long clothesId);
    boolean existsByClothesId(Long clothesId);
    boolean existsByClothesNickname(String nickname);
    Optional<ClothesEntity> findClothesByClothesId(Long clothesId);
    Optional<List<ClothesEntity>> findAllClothes();

    @Query("select c from ClothesEntity c where c.pattern = :#{#clothesCondition.pattern} or c.color = :#{#clothesCondition.color} or c.type = :#{#clothesCondition.type}")
    Optional<List<ClothesEntity>> searchClothesByClothesCondition(@Param("clothesCondition") ClothesCondition clothesCondition);

    @Query("select c from ClothesEntity c where c.nickname like concat('%', :#{#searchKeyword},'%')")
    Optional<List<ClothesEntity>> searchClothesBySearchKeyword(@Param("searchKeyword") String searchKeyword);
}