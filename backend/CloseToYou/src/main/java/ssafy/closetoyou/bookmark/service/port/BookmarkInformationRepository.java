package ssafy.closetoyou.bookmark.service.port;

import ssafy.closetoyou.bookmark.infrastructure.bookmarkinformation.BookmarkInformationEntity;

import java.util.List;

public interface BookmarkInformationRepository {
    BookmarkInformationEntity saveBookmarkInformation(BookmarkInformationEntity bookmarkInformationEntity);
    void deleteBookmarkInformationByBookmarkIdAndClothesId(Long bookmarkId, Long clothesId);
    void deleteBookmarkInformationByBookmarkId(Long bookmarkId);
    boolean existsBookmarkByBookmarkIdAndClothesId(Long bookmarkId, Long clothesId);
    List<Long> findClothesIdsByBookmarkId(Long bookmarkId);
}