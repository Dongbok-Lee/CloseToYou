package ssafy.closetoyou.clothes.controller.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ClothesUpdateRequest {
    private String nickname;
    private String type;
    private String pattern;
    private String color;
    private String memo;
}
