package ssafy.closetoyou.clothes.controller.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import ssafy.closetoyou.clothes.domain.Color;
import ssafy.closetoyou.clothes.domain.Pattern;
import ssafy.closetoyou.clothes.domain.Type;
import ssafy.closetoyou.global.common.util.ValidEnum;

@Getter
public class ClothesCondition {
    @NotNull
    @ValidEnum(enumClass = Color.class)
    private String color;

    @NotNull
    @ValidEnum(enumClass = Type.class)
    private String type;

    @NotNull
    @ValidEnum(enumClass = Pattern.class)
    private String pattern;
}
