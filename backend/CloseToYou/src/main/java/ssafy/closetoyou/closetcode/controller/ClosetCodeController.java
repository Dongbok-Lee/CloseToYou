package ssafy.closetoyou.closetcode.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.closetoyou.closetcode.controller.port.ClosetCodeService;
import ssafy.closetoyou.global.common.response.SuccessResponse;

@RestController
@RequestMapping("/api/closetcodes")
@RequiredArgsConstructor
@Tag(name = "옷장 코드 API")
public class ClosetCodeController {

    private final ClosetCodeService closetCodeService;

    @Operation(summary = "옷장 코드 생성 api")
    @PostMapping
    public ResponseEntity<SuccessResponse<Long>> makeClosetCode() {
        Long closetCodeId = closetCodeService.makeRandomClosetCodeAndSave();
        return ResponseEntity.ok(
                new SuccessResponse<>("옷장 코드 생성에 성공하였습니다.", closetCodeId)
        );
    }

}
