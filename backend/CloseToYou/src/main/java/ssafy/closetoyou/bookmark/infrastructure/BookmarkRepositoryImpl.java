package ssafy.closetoyou.bookmark.infrastructure;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import ssafy.closetoyou.bookmark.domain.Bookmark;
import ssafy.closetoyou.bookmark.service.port.BookmarkRepository;

@Repository
@RequiredArgsConstructor
public class BookmarkRepositoryImpl implements BookmarkRepository {

    private final BookmarkJpaRepository bookmarkJpaRepository;
    @Override
    public boolean existsNicknameByUserIdAndNickname(Long userId, String nickname) {
        return bookmarkJpaRepository.existsNicknameByUserIdAndNicknameAndIsDeleted(userId, nickname, false);
    }

    @Override
    public Bookmark saveBookmark(Bookmark bookmark) {
        return bookmarkJpaRepository.save(BookmarkEntity.fromModel(bookmark)).toModel();
    }
}
