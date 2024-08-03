package ssafy.closetoyou.closet.controller.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class ClosetRequest {

    @NotNull
    private String nickname;

    @NotNull
    private String closetCode;
}
