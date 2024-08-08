package ssafy.closetoyou.user.controller.response;

import lombok.Builder;
import lombok.Getter;
import ssafy.closetoyou.user.domain.User;
import java.time.LocalDateTime;

@Getter
public class UserResponse {
    private String email;
    private String nickname;
    private LocalDateTime createdDateTime;
    private LocalDateTime updatedDateTime;


    @Builder
    public UserResponse(String email, String nickname, LocalDateTime createdDateTime, LocalDateTime updatedDateTime) {
        this.email = email;
        this.nickname = nickname;
        this.createdDateTime = createdDateTime;
        this.updatedDateTime = updatedDateTime;
    }

    public static UserResponse fromModel(User user) {
        return builder()
                .email(user.getEmail())
                .nickname(user.getNickname())
                .createdDateTime(user.getCreatedDateTime())
                .updatedDateTime(user.getUpdatedDateTime())
                .build();
    }
}
