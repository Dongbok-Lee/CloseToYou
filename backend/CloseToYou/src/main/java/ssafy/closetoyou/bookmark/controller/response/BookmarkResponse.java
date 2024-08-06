package ssafy.closetoyou.bookmark.controller.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ssafy.closetoyou.clothes.controller.response.ClothesResponse;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class BookmarkResponse {
    private Long bookmarkId;
    private String nickname;
    private Long userId;
    private Boolean isDeleted;
    private LocalDateTime createDateTime;
    private LocalDateTime updateDateTime;
    private List<ClothesResponse> clothes;

    @Builder

    public BookmarkResponse(Long bookmarkId, String nickname, Long userId, Boolean isDeleted, LocalDateTime createDateTime, LocalDateTime updateDateTime, List<ClothesResponse> clothes) {
        this.bookmarkId = bookmarkId;
        this.nickname = nickname;
        this.userId = userId;
        this.isDeleted = isDeleted;
        this.createDateTime = createDateTime;
        this.updateDateTime = updateDateTime;
        this.clothes = clothes;
    }
}