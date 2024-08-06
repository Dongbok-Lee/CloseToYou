package ssafy.closetoyou.closet.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ssafy.closetoyou.closet.controller.port.ClosetService;
import ssafy.closetoyou.closet.controller.request.ClosetRequest;
import ssafy.closetoyou.closet.controller.response.ClosetResponse;
import ssafy.closetoyou.global.common.response.SuccessResponse;
import ssafy.closetoyou.global.security.login.userdetail.CustomUserDetail;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/api/closets")
@RequiredArgsConstructor
public class ClosetController {


    private final ClosetService closetService;

    @PostMapping
    public ResponseEntity<SuccessResponse<Long>> addCloset(Authentication authentication,
                                                           @Valid @RequestBody ClosetRequest closetRequest) {
        Long userId = ((CustomUserDetail) authentication.getPrincipal()).getUser().getUserId();
        Long closetId = closetService.addCloset(userId, closetRequest);
        return ResponseEntity.status(201)
                .body(new SuccessResponse<>("옷장 등록에 성공했습니다.", closetId));
    }

    @PatchMapping("/{closetId}")
    public ResponseEntity<SuccessResponse<Long>> updateClosetNickname(Authentication authentication,
                                                                      @PathVariable Long closetId,
                                                                      @NotNull @RequestBody Map<String, String> newNickname) {
        Long userId = ((CustomUserDetail) authentication.getPrincipal()).getUser().getUserId();
        closetService.changeClosetInfo(userId, closetId, newNickname.get("nickname"));
        return ResponseEntity.ok(
                new SuccessResponse<>("옷장 정보 수정에 성공했습니다", closetId)
        );
    }

    @DeleteMapping("/{closetId}")
    public ResponseEntity<SuccessResponse<Long>> updateClosetNickname(Authentication authentication,
                                                                      @PathVariable Long closetId) {
        Long userId = ((CustomUserDetail) authentication.getPrincipal()).getUser().getUserId();
        closetService.deleteCloset(userId, closetId);
        return ResponseEntity.ok(
                new SuccessResponse<>("옷장 삭제에 성공했습니다", closetId)
        );
    }

    @GetMapping
    public ResponseEntity<SuccessResponse<List<ClosetResponse>>> getUserClosets(Authentication authentication) {
        Long userId = ((CustomUserDetail) authentication.getPrincipal()).getUser().getUserId();
        List<ClosetResponse> closetResponseList = closetService.getUserClosets(userId);
        return ResponseEntity.ok(
                new SuccessResponse<>("유저 옷장 조회에 성공했습니다.", closetResponseList)
        );
    }

}
