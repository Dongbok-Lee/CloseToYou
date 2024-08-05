package ssafy.closetoyou.clothes.controller.request;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.closetoyou.clothes.domain.Color;
import ssafy.closetoyou.clothes.domain.Pattern;
import ssafy.closetoyou.clothes.domain.Season;
import ssafy.closetoyou.clothes.domain.Type;
import ssafy.closetoyou.global.common.util.ValidEnum;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ClothesUpdateRequest {
    private String nickname;

    @ValidEnum(enumClass = Type.class)
    @NotNull
    private String type;

    @ValidEnum(enumClass = Pattern.class)
    @NotNull
    private String pattern;

    @ValidEnum(enumClass = Color.class)
    @NotNull
    private String color;

    @NotNull
    private String memo;

    @ValidEnum(enumClass = Season.class)
    private Season season;

    @NotNull
    private String size;
}
