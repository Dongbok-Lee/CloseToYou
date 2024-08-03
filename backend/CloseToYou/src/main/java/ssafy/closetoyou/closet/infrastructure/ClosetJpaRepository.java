package ssafy.closetoyou.closet.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClosetJpaRepository extends JpaRepository<ClosetEntity, Long> {
    boolean existsByNickname(String nickname);
    Optional<ClosetEntity> findByUserIdAndClosetIdAndIsDeleted(Long userId, Long closetId, boolean isDeleted);
    Optional<List<ClosetEntity>> findClosetsByUserIdAndIsDeleted(Long userId, boolean isDeleted);
}