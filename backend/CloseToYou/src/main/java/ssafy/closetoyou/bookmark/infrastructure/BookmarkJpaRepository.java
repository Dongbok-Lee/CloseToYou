package ssafy.closetoyou.bookmark.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkJpaRepository extends JpaRepository<BookmarkEntity, Long> {
    boolean existsNicknameByUserIdAndNicknameAndIsDeleted(Long userId, String nickname, boolean isDeleted);
}
