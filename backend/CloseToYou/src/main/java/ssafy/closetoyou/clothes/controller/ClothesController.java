package ssafy.closetoyou.clothes.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ssafy.closetoyou.clothes.controller.port.ClothesService;
import ssafy.closetoyou.clothes.controller.request.ClothesCondition;
import ssafy.closetoyou.clothes.controller.request.ClothesRequest;
import ssafy.closetoyou.clothes.controller.request.ClothesUpdateRequest;
import ssafy.closetoyou.clothes.controller.response.ClothesResponse;
import ssafy.closetoyou.global.common.response.SuccessResponse;
import ssafy.closetoyou.global.security.login.userdetail.CustomUserDetail;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/clothes")
@RequiredArgsConstructor
public class ClothesController {

    private final ClothesService clothesService;

    @PostMapping
    public ResponseEntity<SuccessResponse<Long>> addClothes(@CookieValue(name = "closetId") Long closetId,
                                                            @Valid @RequestBody ClothesRequest clothesRequest) {
        Long clothesId = clothesService.addClothes(closetId, clothesRequest);
        return ResponseEntity.status(201)
                .body(new SuccessResponse<>("옷 생성 성공", clothesId));
    }

    @PatchMapping("/{clothesId}")
    public ResponseEntity<SuccessResponse<Long>> updateClothes(@CookieValue(name = "closetId") Long closetId,
                                                               @Valid @RequestBody ClothesUpdateRequest clothesUpdateRequest,
                                                               @PathVariable Long clothesId) {
        clothesService.updateClothes(closetId, clothesId, clothesUpdateRequest);
        return ResponseEntity.ok()
                .body(new SuccessResponse<>("옷 수정 성공", clothesId));
    }

    @DeleteMapping("/{clothesId}")
    public ResponseEntity<SuccessResponse<Long>> removeClothes(@CookieValue(name = "closetId") Long closetId,
                                                               @PathVariable Long clothesId) {
        clothesService.removeClothes(closetId, clothesId);
        return ResponseEntity.ok()
                .body(new SuccessResponse<>("옷 삭제 성공", clothesId));
    }

    @GetMapping("/{clothesId}")
    public ResponseEntity<SuccessResponse<ClothesResponse>> findClothes(Authentication authentication,
                                                                        @PathVariable Long clothesId) {
        Long userId = ((CustomUserDetail) authentication.getPrincipal()).getUser().getUserId();
        ClothesResponse clothesResponse = clothesService.findClothes(userId, clothesId);
        return ResponseEntity.ok()
                .body((new SuccessResponse<>("옷 상세 정보 조회 성공", clothesResponse)));
    }

    @GetMapping
    public ResponseEntity<SuccessResponse<List<ClothesResponse>>> findAllClothes(Authentication authentication) {
        Long userId = ((CustomUserDetail) authentication.getPrincipal()).getUser().getUserId();
        List<ClothesResponse> clothesResponses = clothesService.findAllClothes(userId);
        log.info("clothesResponses: {}", clothesResponses);
        return ResponseEntity.ok()
                .body((new SuccessResponse<>("옷 전체 조회 성공", clothesResponses)));
    }

    @GetMapping("/search/{keyword}")
    public ResponseEntity<SuccessResponse<List<ClothesResponse>>> searchClothesBySearchKeyword(Authentication authentication,
                                                                                               @PathVariable String keyword) {
        Long userId = ((CustomUserDetail) authentication.getPrincipal()).getUser().getUserId();
        List<ClothesResponse> clothesResponses = clothesService.searchClothesBySearchKeyword(userId, keyword);
        return ResponseEntity.ok()
                .body(new SuccessResponse<>("키워드 기반 옷 검색 성공", clothesResponses));

    }

    @GetMapping("/filter")
    public ResponseEntity<SuccessResponse<List<ClothesResponse>>> searchClothesBySearchFilter(Authentication authentication,
                                                                                              @Valid @RequestBody ClothesCondition clothesCondition) {
        Long userId = ((CustomUserDetail) authentication.getPrincipal()).getUser().getUserId();
        List<ClothesResponse> clothesResponses = clothesService.searchClothesByClothesCondition(userId, clothesCondition);
        return ResponseEntity.ok()
                .body(new SuccessResponse<>("필터 기반 옷 검색 성공", clothesResponses));

    }
}