package ssafy.closetoyou.bookmark.controller.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import ssafy.closetoyou.bookmark.domain.BookmarkCategory;

import java.util.List;

@Getter
@Setter
public class BookmarkRequest {

    @NotNull
    private String nickname;

    private BookmarkCategory category;

    @NotNull
    private List<Long> clothesIds;
}
