package ssafy.closetoyou.user.controller.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class UserUpdateRequest {

    private String nickname;

    private Boolean isHighContrast;

    public UserUpdateRequest(String nickname, Boolean isHighContrast) {
        this.nickname = nickname;
        this.isHighContrast = isHighContrast;
    }
}
