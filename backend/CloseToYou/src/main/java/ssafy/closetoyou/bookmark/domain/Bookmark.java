package ssafy.closetoyou.bookmark.domain;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class Bookmark {
    private Long bookmarkId;
    private String nickname;
    private Long userId;
    private Boolean isDeleted;
    private LocalDateTime createdDateTime;
    private LocalDateTime updateDateTime;

    public void setUpdateDateTime() {
        this.updateDateTime = LocalDateTime.now();
    }

    @Builder
    public Bookmark(Long bookmarkId, String nickname, Long userId, Boolean isDeleted, LocalDateTime createdDateTime, LocalDateTime updateDateTime) {
        this.bookmarkId = bookmarkId;
        this.nickname = nickname;
        this.userId = userId;
        this.isDeleted = false;
        this.createdDateTime = createdDateTime;
        this.updateDateTime = updateDateTime;
    }
}
