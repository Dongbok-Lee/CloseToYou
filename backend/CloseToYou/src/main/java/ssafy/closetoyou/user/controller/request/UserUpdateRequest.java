package ssafy.closetoyou.user.controller.request;

import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class UserUpdateRequest {
    private String nickname;
    private Boolean isHighContrast;

}
