package ssafy.closetoyou.clothes.controller;

import jakarta.validation.Valid;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.closetoyou.clothes.controller.port.ClothesService;
import ssafy.closetoyou.clothes.controller.request.ClothesCondition;
import ssafy.closetoyou.clothes.controller.request.ClothesRequest;
import ssafy.closetoyou.clothes.controller.request.ClothesUpdateRequest;
import ssafy.closetoyou.clothes.controller.response.ClothesResponse;
import ssafy.closetoyou.global.common.response.SuccessResponse;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/clothes")
@RequiredArgsConstructor
public class ClothesController {

    private final ClothesService clothesService;

    @PostMapping
    ResponseEntity<SuccessResponse<Long>> addClothes(@Valid @RequestBody ClothesRequest clothesRequest) {
        Long clothesId = clothesService.addClothes(clothesRequest);
        return ResponseEntity.status(201)
                .body(new SuccessResponse<>("옷 생성 성공", clothesId));
    }

    @PatchMapping("/{clothesId}")
    ResponseEntity<SuccessResponse<Long>> updateClothes(@Valid @RequestBody ClothesUpdateRequest clothesUpdateRequest, @PathVariable Long clothesId) {
        clothesService.updateClothes(clothesId, clothesUpdateRequest);
        return ResponseEntity.ok()
                .body(new SuccessResponse<>("옷 수정 성공", clothesId));
    }

    @DeleteMapping("/{clothesId}")
    ResponseEntity<SuccessResponse<Long>> removeClothes(@PathVariable Long clothesId) {
        clothesService.removeClothes(clothesId);
        return ResponseEntity.ok()
                .body(new SuccessResponse<>("옷 수정 성공", clothesId));
    }

    @GetMapping("/{clothesId}")
    ResponseEntity<SuccessResponse<ClothesResponse>> findClothes(@PathVariable Long clothesId) {
        ClothesResponse clothesResponse = clothesService.findClothes(clothesId);
        return ResponseEntity.ok()
                .body((new SuccessResponse<>("옷 상세 정보 조회 성공", clothesResponse)));
    }

    @GetMapping
    ResponseEntity<SuccessResponse<List<ClothesResponse>>> findAllClothes() {
        List<ClothesResponse> clothesResponses = clothesService.findAllClothes();
        return ResponseEntity.ok()
                .body(new SuccessResponse<>("옷 전체 조회 성공", clothesResponses));
    }

    @GetMapping("/search/{keyword}")
    ResponseEntity<SuccessResponse<List<ClothesResponse>>> searchClothesBySearchKeyword(@PathVariable String keyword) {
        List<ClothesResponse> clothesResponses = clothesService.searchClothesBySearchKeyword(keyword);
        return ResponseEntity.ok()
                .body(new SuccessResponse<>("키워드 기반 옷 검색 성공", clothesResponses));

    }

    @GetMapping("/filter")
    ResponseEntity<SuccessResponse<List<ClothesResponse>>> searchClothesBySearchFilter(@RequestBody ClothesCondition clothesCondition) {
        List<ClothesResponse> clothesResponses = clothesService.searchClothesByClothesCondition(clothesCondition);
        return ResponseEntity.ok()
                .body(new SuccessResponse<>("필터 기반 옷 검색 성공", clothesResponses));

    }
}