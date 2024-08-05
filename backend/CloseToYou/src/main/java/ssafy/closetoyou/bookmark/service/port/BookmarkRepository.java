package ssafy.closetoyou.bookmark.service.port;

import ssafy.closetoyou.bookmark.domain.Bookmark;

public interface BookmarkRepository {

    boolean existsNicknameByUserIdAndNickname(Long userId, String nickname);
    boolean existsBookmarkByUserIdAndBookmarkId(Long userId, Long bookmarkId);
    Bookmark findBookmarkByUserIdAndBookmarkId(Long userId, Long bookmarkId);
    Bookmark saveBookmark(Bookmark bookmark);
}
