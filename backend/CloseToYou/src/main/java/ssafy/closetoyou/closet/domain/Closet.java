package ssafy.closetoyou.closet.domain;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class Closet {
    private String closetId;
    private String nickname;
    private String userId;
    private Boolean isDeleted;
    private LocalDateTime createdDateTime;
    private LocalDateTime updateDateTime;
}
