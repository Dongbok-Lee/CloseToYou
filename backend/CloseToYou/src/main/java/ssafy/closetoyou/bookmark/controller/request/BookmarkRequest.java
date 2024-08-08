package ssafy.closetoyou.bookmark.controller.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import ssafy.closetoyou.bookmark.domain.BookmarkCategory;

import java.util.List;

@Getter
public class BookmarkRequest {

    @NotNull
    private String nickname;

    private BookmarkCategory category;

    @NotNull
    private List<Long> clothesIds;
}
