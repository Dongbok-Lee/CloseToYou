package ssafy.closetoyou.bookmark.controller.port;

import ssafy.closetoyou.bookmark.controller.request.BookmarkRequest;

public interface BookmarkService {

    Long addBookmark(Long userId, BookmarkRequest bookmarkRequest);

}
