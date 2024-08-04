package ssafy.closetoyou.bookmark.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.closetoyou.bookmark.controller.port.BookmarkService;
import ssafy.closetoyou.bookmark.controller.request.BookmarkRequest;
import ssafy.closetoyou.closet.controller.request.ClosetRequest;
import ssafy.closetoyou.global.common.response.SuccessResponse;
import ssafy.closetoyou.global.security.login.userdetail.CustomUserDetail;

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
}
