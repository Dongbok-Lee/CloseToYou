package ssafy.closetoyou.bookmark.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ssafy.closetoyou.bookmark.controller.port.BookmarkService;
import ssafy.closetoyou.bookmark.controller.request.BookmarkRequest;
import ssafy.closetoyou.bookmark.controller.response.BookmarkResponse;
import ssafy.closetoyou.bookmark.domain.Bookmark;
import ssafy.closetoyou.bookmark.infrastructure.bookmarkinformation.BookmarkInformationEntity;
import ssafy.closetoyou.bookmark.service.port.BookmarkInformationRepository;
import ssafy.closetoyou.bookmark.service.port.BookmarkRepository;
import ssafy.closetoyou.clothes.controller.response.ClothesDetail;
import ssafy.closetoyou.clothes.domain.Clothes;
import ssafy.closetoyou.clothes.service.port.ClothesRepository;
import ssafy.closetoyou.global.error.errorcode.BookmarkErrorCode;
import ssafy.closetoyou.global.error.errorcode.ClothesErrorCode;
import ssafy.closetoyou.global.error.exception.CloseToYouException;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class BookmarkServiceImpl implements BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final BookmarkInformationRepository bookmarkInformationRepository;
    private final ClothesRepository clothesRepository;

    @Override
    public Long addBookmark(Long userId, BookmarkRequest bookmarkRequest) {

        checkNicknameDuplicate(userId, bookmarkRequest.getNickname());
        checkAllClothesExists(userId, bookmarkRequest.getClothesIds());

        Bookmark bookmark = Bookmark.builder()
                .nickname(bookmarkRequest.getNickname())
                .userId(userId)
                .build();

        bookmark = bookmarkRepository.saveBookmark(bookmark);

        Long bookmarkId = bookmark.getBookmarkId();

        for (Long clothesId : bookmarkRequest.getClothesIds()) {
            BookmarkInformationEntity bookmarkInformationEntity = getBookmarkInformationEntity(clothesId, bookmarkId);
            bookmarkInformationRepository.saveBookmarkInformation(bookmarkInformationEntity);
        }

        return bookmarkId;
    }

    @Override
    public void addBookmarkInformation(Long userId, Long bookmarkId, Long clothesId) {

        checkBookmarkExists(userId, bookmarkId);
        checkClothesDuplicate(bookmarkId, clothesId);
        setUpdateTime(userId, bookmarkId);

        BookmarkInformationEntity bookmarkInformationEntity = getBookmarkInformationEntity(clothesId, bookmarkId);

        bookmarkInformationRepository.saveBookmarkInformation(bookmarkInformationEntity);
    }


    @Override
    public void deleteBookmarkInformation(Long userId, Long bookmarkId, Long clothesId) {

        checkBookmarkExists(userId, bookmarkId);

        setUpdateTime(userId, bookmarkId);

        bookmarkInformationRepository.deleteBookmarkInformationByBookmarkIdAndClothesId(bookmarkId, clothesId);
    }

    @Override
    public void updateBookmarkNickname(Long userId, Long bookmarkId, String nickname) {

        checkNicknameDuplicate(userId, nickname);
        checkBookmarkExists(userId, bookmarkId);

        Bookmark bookmark = bookmarkRepository.findBookmarkByUserIdAndBookmarkId(userId, bookmarkId);
        bookmark.updateNickname(nickname);
        bookmarkRepository.saveBookmark(bookmark);
    }

    @Override
    public void deleteBookmark(Long userId, Long bookmarkId) {

        checkBookmarkExists(userId, bookmarkId);

        Bookmark bookmark = bookmarkRepository.findBookmarkByUserIdAndBookmarkId(userId, bookmarkId);
        bookmark.delete();
        bookmarkRepository.saveBookmark(bookmark);

        bookmarkInformationRepository.deleteBookmarkInformationByBookmarkId(bookmarkId);
    }

    @Override
    public BookmarkResponse findBookmark(Long userId, Long bookmarkId) {

        checkBookmarkExists(userId, bookmarkId);

        Bookmark bookmark = bookmarkRepository.findBookmarkByUserIdAndBookmarkId(userId, bookmarkId);

        List<ClothesDetail> clothesDetailList = new ArrayList<>();

        List<Long> clothesIds = bookmarkInformationRepository.findClothesIdsByBookmarkId(bookmarkId);
        for (Long clothesId: clothesIds) {
            Clothes clothes = clothesRepository.findClothesByClothesId(clothesId);
            clothesDetailList.add(ClothesDetail.fromModel(clothes));
        }

        return BookmarkResponse.builder()
                .bookmarkId(bookmarkId)
                .nickname(bookmark.getNickname())
                .userId(userId)
                .isDeleted(bookmark.getIsDeleted())
                .createDateTime(bookmark.getCreatedDateTime())
                .updateDateTime(bookmark.getUpdateDateTime())
                .clothes(clothesDetailList)
                .build();
    }

    @Override
    public List<BookmarkResponse> findAllBookmarks(Long userId) {
        List<Bookmark> bookmarks = bookmarkRepository.findBookmarksByUserId(userId);
        List<BookmarkResponse> bookmarkResponseList = new ArrayList<>();
        for (Bookmark bookmark : bookmarks) {
            log.info("bookmark id: {}", bookmark.getBookmarkId());
            bookmarkResponseList.add(findBookmark(userId, bookmark.getBookmarkId()));
        }
        return bookmarkResponseList;
    }

    private void checkAllClothesExists(Long userId, List<Long> clothesIds) {
        for (Long clothesId : clothesIds) {
            if (!clothesRepository.existClothesByClothesId(clothesId)) {
                throw new CloseToYouException(ClothesErrorCode.NO_CLOTHES_EXCEPTION);
            }
        }
    }

    public void checkBookmarkExists(Long userId, Long bookmarkId) {
        if (!bookmarkRepository.existsBookmarkByUserIdAndBookmarkId(userId, bookmarkId)) {
            throw new CloseToYouException(BookmarkErrorCode.NO_BOOKMARK_EXCEPTION);
        }
    }

    public void checkNicknameDuplicate(Long userId, String nickname) {
        if (bookmarkRepository.existsNicknameByUserIdAndNickname(userId, nickname)) {
            throw new CloseToYouException(BookmarkErrorCode.DUPLICATED_BOOKMARK_NICKNAME);
        }
    }

    private void setUpdateTime(Long userId, Long bookmarkId) {
        Bookmark bookmark = bookmarkRepository.findBookmarkByUserIdAndBookmarkId(userId, bookmarkId);
        bookmark.updateUpdateDateTime();
        bookmarkRepository.saveBookmark(bookmark);
    }

    private static BookmarkInformationEntity getBookmarkInformationEntity(Long clothesId, Long bookmarkId) {
        return BookmarkInformationEntity.builder()
                .bookmarkId(bookmarkId)
                .clothesId(clothesId)
                .build();
    }
    private void checkClothesDuplicate(Long bookmarkId, Long clothesId) {
        if (bookmarkInformationRepository.existsBookmarkByBookmarkIdAndClothesId(bookmarkId, clothesId)) {
            throw new CloseToYouException(BookmarkErrorCode.DUPLICATED_BOOKMARK_CLOTHES);
        }
    }
}
