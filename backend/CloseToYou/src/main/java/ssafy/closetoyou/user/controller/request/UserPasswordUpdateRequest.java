package ssafy.closetoyou.user.controller.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class UserPasswordUpdateRequest {

    @NotNull
    private String oldPassword;

    @NotNull
    private String newPassword;
}
