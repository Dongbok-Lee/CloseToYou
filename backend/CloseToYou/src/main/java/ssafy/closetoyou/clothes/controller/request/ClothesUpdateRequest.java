package ssafy.closetoyou.clothes.controller.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.closetoyou.clothes.domain.Color;
import ssafy.closetoyou.clothes.domain.Pattern;
import ssafy.closetoyou.clothes.domain.Type;
import ssafy.closetoyou.global.common.util.ValidEnum;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ClothesUpdateRequest {
    private String nickname;

    @ValidEnum(enumClass = Type.class)
    private String type;

    @ValidEnum(enumClass = Pattern.class)
    private String pattern;

    @ValidEnum(enumClass = Color.class)
    private String color;

    private String memo;
}
