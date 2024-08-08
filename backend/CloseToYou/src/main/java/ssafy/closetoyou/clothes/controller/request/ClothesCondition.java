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
    private Long closetId;

    @ValidEnum(enumClass = Color.class)
    private String color;

    @ValidEnum(enumClass = Type.class)
    private String type;

    @ValidEnum(enumClass = Pattern.class)
    private String pattern;

    @Builder
    public ClothesCondition(Long closetId, String color, String type, String pattern) {
        this.closetId = closetId;
        this.color = color;
        this.type = type;
        this.pattern = pattern;
    }
}
