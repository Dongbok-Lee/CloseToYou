package ssafy.closetoyou.closet.infrastructure.closetcode;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClosetCodeJpaRepository extends JpaRepository<ClosetCodeEntity, Long> {
    boolean existsByClosetCodeAndIsUsed(String closetCode, boolean isUsed);
    Optional<ClosetCodeEntity> findByClosetCode(String closetCode);
}