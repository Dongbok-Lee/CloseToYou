package ssafy.closetoyou.bookmark.service.port;

import ssafy.closetoyou.bookmark.domain.Bookmark;

public interface BookmarkRepository {

    boolean existsNicknameByUserIdAndNickname(Long userId, String nickname);
    Bookmark saveBookmark(Bookmark bookmark);
}
