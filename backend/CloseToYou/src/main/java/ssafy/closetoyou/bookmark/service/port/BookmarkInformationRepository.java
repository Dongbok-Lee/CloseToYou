package ssafy.closetoyou.bookmark.service.port;

import ssafy.closetoyou.bookmark.infrastructure.bookmarkinformation.BookmarkInformationEntity;

public interface BookmarkInformationRepository {
    BookmarkInformationEntity saveBookmarkInformation(BookmarkInformationEntity bookmarkInformationEntity);
}
