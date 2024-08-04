package ssafy.closetoyou.global.error.errorcode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum BookmarkErrorCode implements ErrorCode {

    DUPLICATED_BOOKMARK_NICKNAME(HttpStatus.CONFLICT, "이미 존재하는 북마크 닉네임니다.");
    private final HttpStatus status;
    private final String message;
}
