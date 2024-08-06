package ssafy.closetoyou.closet.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter @ToString
public class Closet {
    private Long closetId;
    private String nickname;
    private Long userId;
    private String closetCode;
    private Boolean isDeleted = false;
    private LocalDateTime createdDateTime;
    private LocalDateTime updateDateTime;

    @Setter
    private int clothesCount;

    @Builder
    public Closet(Long closetId, String nickname, Long userId, String closetCode, Boolean isDeleted, LocalDateTime createdDateTime, LocalDateTime updateDateTime, int clothesCount) {
        this.closetId = closetId;
        this.nickname = nickname;
        this.userId = userId;
        this.closetCode = closetCode;
        this.isDeleted = isDeleted;
        this.createdDateTime = createdDateTime;
        this.updateDateTime = updateDateTime;
        this.clothesCount = clothesCount;
    }
}
