package ssafy.closetoyou.bookmark.controller.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class BookmarkRequest {

    @NotNull
    private String nickname;

    @NotNull
    private List<Long> clothesIds;

    @Builder
    public BookmarkRequest(String nickname, List<Long> clothesIds) {
        this.nickname = nickname;
        this.clothesIds = clothesIds;
    }
}
