package ssafy.closetoyou.bookmark.domain;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class Bookmark {
    private Long bookmarkId;
    private String nickname;
    private BookmarkCategory category;
    private Long userId;
    private Boolean isDeleted = false;
    private LocalDateTime createdDateTime;
    private LocalDateTime updateDateTime;

    @Builder
    public Bookmark(Long bookmarkId, String nickname, BookmarkCategory category, Long userId, Boolean isDeleted, LocalDateTime createdDateTime, LocalDateTime updateDateTime) {
        this.bookmarkId = bookmarkId;
        this.nickname = nickname;
        this.category = category;
        this.userId = userId;
        this.isDeleted = isDeleted;
        this.createdDateTime = createdDateTime;
        this.updateDateTime = updateDateTime;
    }
}
