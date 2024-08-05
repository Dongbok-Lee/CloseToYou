package ssafy.closetoyou.bookmark.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
public class Bookmark {
    private Long bookmarkId;
    @Setter
    private String nickname;
    private Long userId;

    @Setter
    private Boolean isDeleted;
    private LocalDateTime createdDateTime;

    @Setter
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
