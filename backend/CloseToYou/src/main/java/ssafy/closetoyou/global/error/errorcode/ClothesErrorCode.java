package ssafy.closetoyou.global.error.errorcode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ClothesErrorCode implements ErrorCode {
    DUPLICATE_CLOTHES_NICKNAME(HttpStatus.CONFLICT, "이미 존재하는 닉네임 입니다."),
    DUPLICATE_CLOTHES(HttpStatus.CONFLICT, "이미 존재하는 옷 입니다"),
    NO_CLOTHES_EXCEPTION(HttpStatus.NOT_FOUND, "존재하지 않는 옷 입니다");

    private final HttpStatus status;
    private final String message;
}
