package ssafy.closetoyou.global.error.errorcode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ClosetErrorCode implements ErrorCode {
    NO_CLOSET_CODE_EXCEPTION(HttpStatus.NOT_FOUND, "해당 옷장 코드는 존재하지 않거나 사용중입니다."),
    NO_CLOSET_EXCEPTION(HttpStatus.NOT_FOUND, "존재하지 않는 옷장입니다."),
    DUPLICATE_CLOSET_NICKNAME(HttpStatus.CONFLICT, "이미 존재하는 닉네임 입니다.");


    private final HttpStatus status;
    private final String message;
}
