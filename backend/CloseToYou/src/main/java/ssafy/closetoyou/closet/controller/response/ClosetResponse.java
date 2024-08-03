package ssafy.closetoyou.closet.controller.response;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ClosetResponse {
    private String closetId;
    private String nickname;
    private String closetCode;
    private LocalDateTime registTime;
}
