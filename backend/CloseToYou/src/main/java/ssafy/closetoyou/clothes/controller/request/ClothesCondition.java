package ssafy.closetoyou.clothes.controller.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ClothesCondition {
    private String color;
    private String type;
    private String pattern;

    @Builder
    public ClothesCondition(String color, String type, String pattern) {
        this.color = color == null ? "" : color;
        this.type = type == null ? "" : type;
        this.pattern = pattern == null ? "" : pattern;
    }
}
