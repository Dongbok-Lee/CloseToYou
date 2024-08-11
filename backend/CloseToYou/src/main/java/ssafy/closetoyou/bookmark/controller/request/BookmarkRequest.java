package ssafy.closetoyou.bookmark.controller.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class BookmarkRequest {

    @NotNull(message = "닉네임을 입력해주세요.")
    private String nickname;

    @NotNull(message = "북마크에 담을 옷을 선택해주세요.")
    private List<Long> clothesIds;

    @Builder
    public BookmarkRequest(String nickname, List<Long> clothesIds) {
        this.nickname = nickname;
        this.clothesIds = clothesIds;
    }
}
