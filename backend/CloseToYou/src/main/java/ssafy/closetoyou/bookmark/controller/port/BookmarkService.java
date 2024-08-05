package ssafy.closetoyou.bookmark.controller.port;

import ssafy.closetoyou.bookmark.controller.request.BookmarkRequest;

import java.util.List;

public interface BookmarkService {

    Long addBookmark(Long userId, BookmarkRequest bookmarkRequest);
    Long addBookmarkInformation(Long userId, Long bookmarkId, Long clothesId);
    Long deleteBookmarkInformation(Long userId, Long bookmarkId, Long clothesId);
}
