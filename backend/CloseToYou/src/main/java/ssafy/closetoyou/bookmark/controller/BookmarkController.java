package ssafy.closetoyou.bookmark.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ssafy.closetoyou.bookmark.controller.port.BookmarkService;
import ssafy.closetoyou.bookmark.controller.request.BookmarkRequest;
import ssafy.closetoyou.closet.controller.port.ClosetService;
import ssafy.closetoyou.closet.controller.request.ClosetRequest;
import ssafy.closetoyou.global.common.response.SuccessResponse;
import ssafy.closetoyou.global.security.login.userdetail.CustomUserDetail;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookmarks")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;
    @PostMapping
    public ResponseEntity<SuccessResponse<Long>> addBookmark(Authentication authentication,
                                                             @Valid @RequestBody BookmarkRequest bookmarkRequest) {
        Long userId = ((CustomUserDetail) authentication.getPrincipal()).getUser().getUserId();
        Long bookmarkId = bookmarkService.addBookmark(userId, bookmarkRequest);
        return ResponseEntity.status(201)
                .body(new SuccessResponse<>("북마크 생성에 성공했습니다.", bookmarkId));
    }

    @PatchMapping("/{bookmarkId}/add/{clothesId}")
    public ResponseEntity<SuccessResponse<Long>> addBookmarkInformation(Authentication authentication,
                                                                @PathVariable Long bookmarkId,
                                                                @PathVariable Long clothesId) {
        Long userId = ((CustomUserDetail) authentication.getPrincipal()).getUser().getUserId();
        bookmarkService.addBookmarkInformation(userId, bookmarkId, clothesId);
        return ResponseEntity.ok(
                new SuccessResponse<>("북마크 옷 구성 추가에 성공했습니다.")
        );
    }

    @PatchMapping("/{bookmarkId}/delete/{clothesId}")
    public ResponseEntity<SuccessResponse<Long>> deleteBookmarkInformation(Authentication authentication,
                                                                @PathVariable Long bookmarkId,
                                                                @PathVariable Long clothesId) {
        Long userId = ((CustomUserDetail) authentication.getPrincipal()).getUser().getUserId();
        bookmarkService.deleteBookmarkInformation(userId, bookmarkId, clothesId);
        return ResponseEntity.ok(
                new SuccessResponse<>("북마크 옷 구성 삭제에 성공했습니다.")
        );
    }

}
