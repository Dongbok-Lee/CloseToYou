package ssafy.closetoyou.user.controller.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class UserUpdateRequest {

    @NotNull
    private String nickname;

    @NotNull
    private Boolean isHighContrast;
}
