package ssafy.closetoyou.bookmark.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.closetoyou.bookmark.controller.port.BookmarkService;
import ssafy.closetoyou.bookmark.controller.request.BookmarkRequest;
import ssafy.closetoyou.bookmark.domain.Bookmark;
import ssafy.closetoyou.bookmark.infrastructure.bookmarkinformation.BookmarkInformationEntity;
import ssafy.closetoyou.bookmark.service.port.BookmarkInformationRepository;
import ssafy.closetoyou.bookmark.service.port.BookmarkRepository;
import ssafy.closetoyou.global.error.errorcode.BookmarkErrorCode;
import ssafy.closetoyou.global.error.errorcode.ClosetErrorCode;
import ssafy.closetoyou.global.error.exception.CloseToYouException;

@Service
@RequiredArgsConstructor
@Transactional
public class BookmarkServiceImpl implements BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final BookmarkInformationRepository bookmarkInformationRepository;
    @Override
    public Long addBookmark(Long userId, BookmarkRequest bookmarkRequest) {

        if (bookmarkRepository.existsNicknameByUserIdAndNickname(userId, bookmarkRequest.getNickname())) {
            throw new CloseToYouException(BookmarkErrorCode.DUPLICATED_BOOKMARK_NICKNAME);
        }

        Bookmark bookmark = Bookmark.builder()
                .nickname(bookmarkRequest.getNickname())
                .category(bookmarkRequest.getCategory())
                .userId(userId)
                .build();

        Long bookmarkId = bookmarkRepository.saveBookmark(bookmark).getBookmarkId();

        for (Long clothesId : bookmarkRequest.getClothesIds()) {
            BookmarkInformationEntity bookmarkInformationEntity = BookmarkInformationEntity.builder()
                    .bookmarkId(bookmarkId)
                    .clothesId(clothesId)
                    .build();
            bookmarkInformationRepository.saveBookmarkInformation(bookmarkInformationEntity);
        }

        return bookmarkId;
    }
}
