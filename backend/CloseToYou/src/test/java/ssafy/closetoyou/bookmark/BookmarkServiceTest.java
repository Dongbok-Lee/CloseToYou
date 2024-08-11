package ssafy.closetoyou.bookmark;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;
import ssafy.closetoyou.bookmark.controller.port.BookmarkService;
import ssafy.closetoyou.bookmark.controller.request.BookmarkRequest;
import ssafy.closetoyou.bookmark.controller.response.BookmarkResponse;
import ssafy.closetoyou.bookmark.domain.Bookmark;
import ssafy.closetoyou.bookmark.infrastructure.bookmarkinformation.BookmarkInformationEntity;
import ssafy.closetoyou.bookmark.service.port.BookmarkInformationRepository;
import ssafy.closetoyou.bookmark.service.port.BookmarkRepository;
import ssafy.closetoyou.closet.domain.Closet;
import ssafy.closetoyou.clothes.domain.Clothes;
import ssafy.closetoyou.clothes.domain.Color;
import ssafy.closetoyou.clothes.domain.Pattern;
import ssafy.closetoyou.clothes.domain.Type;
import ssafy.closetoyou.clothes.service.port.ClothesRepository;
import ssafy.closetoyou.global.error.exception.CloseToYouException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;


@SpringBootTest
@ExtendWith(SpringExtension.class)
@Transactional
class BookmarkServiceTest {

    @Autowired
    BookmarkService bookmarkService;

    @MockBean
    ClothesRepository clothesRepository;

    @MockBean
    BookmarkRepository bookmarkRepository;

    @MockBean
    BookmarkInformationRepository bookmarkInformationRepository;

    String fakeNickname = "내 북마크";
    Long fakeUserId = 1L;
    Long fakeBookmarkId = 1L;
    Long fakeClothesId = 1L;

    @Test
    @DisplayName("유저는 북마크를 생성할 수 있다.")
    void addBookmark() {
        //given
        BookmarkRequest bookmarkRequest = BookmarkRequest.builder().nickname(fakeNickname).clothesIds(new ArrayList<Long>(Arrays.asList(1L, 2L))).build();
        Bookmark bookmark = new Bookmark(fakeBookmarkId, fakeNickname, fakeUserId, false);

        BookmarkInformationEntity bookmarkInformationEntity1 = BookmarkInformationEntity
                .builder().bookmarkId(fakeBookmarkId).clothesId(1L).build();
        BookmarkInformationEntity bookmarkInformationEntity2 = BookmarkInformationEntity
                .builder().bookmarkId(fakeBookmarkId).clothesId(2L).build();

        //when
        Mockito.when(bookmarkRepository.saveBookmark(any(Bookmark.class))).thenReturn(bookmark);
        Mockito.when(bookmarkRepository.existsNicknameByUserIdAndNickname(fakeUserId, fakeNickname)).thenReturn(false);
        Mockito.when(clothesRepository.existClothesByClothesId(1L)).thenReturn(true);
        Mockito.when(clothesRepository.existClothesByClothesId(2L)).thenReturn(true);
        Mockito.when(bookmarkInformationRepository.saveBookmarkInformation(bookmarkInformationEntity1)).thenReturn(bookmarkInformationEntity1);
        Mockito.when(bookmarkInformationRepository.saveBookmarkInformation(bookmarkInformationEntity2)).thenReturn(bookmarkInformationEntity2);

        //then
        assertThat(bookmarkService.addBookmark(fakeUserId, bookmarkRequest)).isEqualTo(fakeBookmarkId);
    }

    @Test
    @DisplayName("유저는 중복되는 닉네임의 북마크를 추가할 수 없다.")
    void addBookmarkDuplicateNickname() {
        //given
        Bookmark bookmark = Bookmark.builder()
                .userId(fakeUserId)
                .isDeleted(false)
                .nickname(fakeNickname)
                .build();

        //when
        Mockito.when(bookmarkRepository.existsNicknameByUserIdAndNickname(fakeUserId, fakeNickname)).thenReturn(true);

        //then
        assertThrows(CloseToYouException.class, () -> {
            bookmarkService.addBookmark(fakeUserId,
                    BookmarkRequest.builder()
                            .nickname(fakeNickname)
                            .clothesIds(new ArrayList<>())
                            .build()
            );
        });
    }

    @Test
    @DisplayName("북마크에 이미 있는 옷을 추가할 수 없다.")
    void addBookmarkInformationDuplicateClothes() {
        //given
        Bookmark bookmark = new Bookmark(fakeBookmarkId, fakeNickname, fakeUserId, false);

        //when
        Mockito.when(bookmarkInformationRepository.existsBookmarkByBookmarkIdAndClothesId(fakeBookmarkId, fakeClothesId)).thenReturn(true);

        //then
        assertThrows(CloseToYouException.class, () -> {
            bookmarkService.addBookmarkInformation(fakeUserId, bookmark.getBookmarkId(), 1L);
        });
    }

    @Test
    @DisplayName("북마크 닉네임을 변경할 수 있다.")
    void updateBookmarkNickname() {
        //given
        String newNickname = "새로운 닉네임";
        Bookmark bookmark = new Bookmark(fakeBookmarkId, fakeNickname, fakeUserId, false);

        //when
        Mockito.when(bookmarkRepository.existsNicknameByUserIdAndNickname(fakeUserId, newNickname)).thenReturn(false);
        Mockito.when(bookmarkRepository.existsBookmarkByUserIdAndBookmarkId(fakeUserId, fakeBookmarkId)).thenReturn(true);
        Mockito.when(bookmarkRepository.findBookmarkByUserIdAndBookmarkId(fakeUserId, fakeBookmarkId)).thenReturn(bookmark);
        Mockito.when(bookmarkRepository.saveBookmark(any(Bookmark.class))).thenReturn(bookmark);
        bookmarkService.updateBookmarkNickname(fakeUserId, fakeBookmarkId, newNickname);

        //then
        assertThat(bookmark.getNickname()).isEqualTo(newNickname);
    }

    @Test
    @DisplayName("이미 있는 북마크 닉네임으로 변경할 수 없다.")
    void updateBookmarkDuplicateNickname() {
        //given & when
        Mockito.when(bookmarkRepository.existsNicknameByUserIdAndNickname(fakeUserId, fakeNickname)).thenReturn(true);

        //then
        assertThrows(CloseToYouException.class, () -> {
            bookmarkService.updateBookmarkNickname(fakeUserId, fakeBookmarkId, fakeNickname);
        });
    }

    @Test
    @DisplayName("북마크를 삭제할 수 있다.")
    void deleteBookmark() {
        //given
        Bookmark bookmark = new Bookmark(fakeBookmarkId, fakeNickname, fakeUserId, false);

        //when
        Mockito.when(bookmarkRepository.existsBookmarkByUserIdAndBookmarkId(fakeUserId, fakeBookmarkId)).thenReturn(true);
        Mockito.when(bookmarkRepository.findBookmarkByUserIdAndBookmarkId(fakeUserId, fakeBookmarkId)).thenReturn(bookmark);
        Mockito.when(bookmarkRepository.saveBookmark(any(Bookmark.class))).thenReturn(bookmark);
        bookmarkService.deleteBookmark(fakeUserId, fakeBookmarkId);

        //then
        assertThat(bookmark.getIsDeleted()).isTrue();
    }

    @Test
    @DisplayName("북마크 아이디를 기반으로 북마크의 세부 정보를 조회할 수 있다.")
    void findBookmark() {
        //given
        Closet closet = Closet.builder().nickname("옷장 닉네임").closetCode("A1B2C3").build();
        Clothes clothes1 =  new Clothes(1L, closet, "A1", "옷1", Type.COAT, Pattern.DOT, Color.BEIGE);
        Clothes clothes2 =  new Clothes(2L, closet, "A2", "옷2", Type.COAT, Pattern.DOT, Color.BEIGE);
        Clothes clothes3 =  new Clothes(3L, closet, "A3", "옷3", Type.COAT, Pattern.DOT, Color.BEIGE);

        Bookmark bookmark = new Bookmark(fakeBookmarkId, fakeNickname, fakeUserId, false);

        //when
        Mockito.when(bookmarkRepository.existsBookmarkByUserIdAndBookmarkId(fakeUserId, fakeBookmarkId)).thenReturn(true);
        Mockito.when(bookmarkRepository.findBookmarkByUserIdAndBookmarkId(fakeUserId, fakeBookmarkId)).thenReturn(bookmark);
        Mockito.when(bookmarkInformationRepository.findClothesIdsByBookmarkId(fakeBookmarkId)).thenReturn(new ArrayList<>(Arrays.asList(1L, 2L, 3L)));
        Mockito.when(clothesRepository.findClothesByClothesId(1L)).thenReturn(clothes1);
        Mockito.when(clothesRepository.findClothesByClothesId(2L)).thenReturn(clothes2);
        Mockito.when(clothesRepository.findClothesByClothesId(3L)).thenReturn(clothes3);
        BookmarkResponse bookmarkResponse = bookmarkService.findBookmark(fakeUserId, fakeBookmarkId);

        //then
        assertThat(bookmarkResponse.getNickname()).isEqualTo(fakeNickname);
        assertThat(bookmarkResponse.getClothes()).hasSize(3);
    }

    @Test
    @DisplayName("해당 유저의 모든 북마크를 조회할 수 있다.")
    void findAllBookmarks() {
        //given
        Closet closet = Closet.builder().nickname("옷장 닉네임").closetCode("A1B2C3").build();

        Clothes clothes1 =  new Clothes(1L, closet, "A1", "옷1", Type.COAT, Pattern.DOT, Color.BEIGE);
        Clothes clothes2 =  new Clothes(2L, closet, "A2", "옷2", Type.COAT, Pattern.DOT, Color.BEIGE);
        Bookmark bookmark1 = new Bookmark(1L, "북마크 1", fakeUserId, false);

        Clothes clothes3=  new Clothes(3L, closet, "A3", "옷1", Type.COAT, Pattern.DOT, Color.BEIGE);
        Clothes clothes4 =  new Clothes(4L, closet, "A4", "옷2", Type.COAT, Pattern.DOT, Color.BEIGE);
        Bookmark bookmark2 = new Bookmark(2L, "북마크 2", fakeUserId, false);

        //when
        Mockito.when(bookmarkRepository.findBookmarksByUserId(fakeUserId)).thenReturn(new ArrayList<>(Arrays.asList(bookmark1, bookmark2)));
        Mockito.when(bookmarkRepository.existsBookmarkByUserIdAndBookmarkId(fakeUserId, 1L)).thenReturn(true);
        Mockito.when(bookmarkRepository.existsBookmarkByUserIdAndBookmarkId(fakeUserId, 2L)).thenReturn(true);
        Mockito.when(bookmarkRepository.findBookmarkByUserIdAndBookmarkId(fakeUserId, 1L)).thenReturn(bookmark1);
        Mockito.when(bookmarkRepository.findBookmarkByUserIdAndBookmarkId(fakeUserId, 2L)).thenReturn(bookmark2);
        Mockito.when(bookmarkInformationRepository.findClothesIdsByBookmarkId(1L)).thenReturn(new ArrayList<>(Arrays.asList(1L, 2L)));
        Mockito.when(bookmarkInformationRepository.findClothesIdsByBookmarkId(2L)).thenReturn(new ArrayList<>(Arrays.asList(3L, 4L)));

        Mockito.when(clothesRepository.findClothesByClothesId(1L)).thenReturn(clothes1);
        Mockito.when(clothesRepository.findClothesByClothesId(2L)).thenReturn(clothes2);
        Mockito.when(clothesRepository.findClothesByClothesId(3L)).thenReturn(clothes3);
        Mockito.when(clothesRepository.findClothesByClothesId(4L)).thenReturn(clothes4);

        List<BookmarkResponse> bookmarkResponseList = bookmarkService.findAllBookmarks(fakeUserId);

        //then
        assertThat(bookmarkResponseList).hasSize(2);
    }
}