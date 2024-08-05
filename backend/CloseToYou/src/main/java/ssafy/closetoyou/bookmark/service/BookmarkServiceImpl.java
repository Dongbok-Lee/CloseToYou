package ssafy.closetoyou.bookmark.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ssafy.closetoyou.bookmark.controller.port.BookmarkService;
import ssafy.closetoyou.bookmark.controller.request.BookmarkRequest;
import ssafy.closetoyou.bookmark.domain.Bookmark;
import ssafy.closetoyou.bookmark.infrastructure.bookmarkinformation.BookmarkInformationEntity;
import ssafy.closetoyou.bookmark.service.port.BookmarkInformationRepository;
import ssafy.closetoyou.bookmark.service.port.BookmarkRepository;
import ssafy.closetoyou.global.error.errorcode.BookmarkErrorCode;
import ssafy.closetoyou.global.error.exception.CloseToYouException;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
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

    @Override
    public Long addBookmarkInformation(Long userId, Long bookmarkId, Long clothesId) {

        log.info("user: {}, bookmarkId: {}, clothesId: {}", userId, bookmarkId, clothesId);

        if (!bookmarkRepository.existsBookmarkByUserIdAndBookmarkId(userId, bookmarkId)) {
            throw new CloseToYouException(BookmarkErrorCode.NO_BOOKMARK_EXCEPTION);
        }

        log.info("업데이트 시간을 변경합니다.");

        // 업데이트 시간 변경
        Bookmark bookmark = bookmarkRepository.findBookmarkByUserIdAndBookmarkId(userId, bookmarkId);
        bookmark.setUpdateDateTime();
        bookmarkRepository.saveBookmark(bookmark);


        // bookmarkInformation 생성
        BookmarkInformationEntity bookmarkInformationEntity = BookmarkInformationEntity.builder()
                .bookmarkId(bookmarkId)
                .clothesId(clothesId)
                .build();

        bookmarkInformationRepository.saveBookmarkInformation(bookmarkInformationEntity);

        return bookmark.getBookmarkId();
    }

    @Override
    public Long deleteBookmarkInformation(Long userId, Long bookmarkId, Long clothesId) {

        log.info("user: {}, bookmarkId: {}, clothesId: {}", userId, bookmarkId, clothesId);

        if (!bookmarkRepository.existsBookmarkByUserIdAndBookmarkId(userId, bookmarkId)) {
            throw new CloseToYouException(BookmarkErrorCode.NO_BOOKMARK_EXCEPTION);
        }

        // 업데이트 시간 변경
        Bookmark bookmark = bookmarkRepository.findBookmarkByUserIdAndBookmarkId(userId, bookmarkId);
        bookmark.setUpdateDateTime();
        bookmarkRepository.saveBookmark(bookmark);

        bookmarkInformationRepository.deleteBookmarkInformation(bookmarkId, clothesId);

        return bookmark.getBookmarkId();
    }
}
