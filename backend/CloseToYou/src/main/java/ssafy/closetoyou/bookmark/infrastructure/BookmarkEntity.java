package ssafy.closetoyou.bookmark.infrastructure;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import ssafy.closetoyou.bookmark.domain.Bookmark;
import ssafy.closetoyou.bookmark.domain.BookmarkCategory;

import java.time.LocalDateTime;

@Entity(name = "bookmarks")
@Getter
@Setter
@ToString
@EntityListeners(AuditingEntityListener.class)
public class BookmarkEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookmarkId;
    private String nickname;
    private BookmarkCategory category;
    private Long userId;
    private Boolean isDeleted = false;

    @CreatedDate
    private LocalDateTime createdDateTime;

    @LastModifiedDate
    private LocalDateTime updateDateTime;

    @Builder
    public BookmarkEntity(Long bookmarkId, String nickname, BookmarkCategory category, Long userId, Boolean isDeleted, LocalDateTime createdDateTime, LocalDateTime updateDateTime) {
        this.bookmarkId = bookmarkId;
        this.nickname = nickname;
        this.category = category;
        this.userId = userId;
        this.isDeleted = isDeleted;
        this.createdDateTime = createdDateTime;
        this.updateDateTime = updateDateTime;
    }

    public static BookmarkEntity fromModel(Bookmark bookmark) {
        return BookmarkEntity.builder()
                .bookmarkId(bookmark.getBookmarkId())
                .nickname(bookmark.getNickname())
                .category(bookmark.getCategory())
                .userId(bookmark.getUserId())
                .isDeleted(false)
                .createdDateTime(bookmark.getCreatedDateTime())
                .updateDateTime(bookmark.getUpdateDateTime())
                .build();
    }

    public Bookmark toModel() {
        return Bookmark.builder()
                .bookmarkId(bookmarkId)
                .nickname(nickname)
                .category(category)
                .userId(userId)
                .isDeleted(isDeleted)
                .createdDateTime(createdDateTime)
                .updateDateTime(updateDateTime)
                .build();
    }
}
