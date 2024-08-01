package ssafy.closetoyou.clothes.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
public class SearchFilter {
    private String color;
    private String type;
    private String pattern;

    @Builder
    public SearchFilter(String color, String type, String pattern) {
        this.color = color == null ? "" : color;
        this.type = type == null ? "" : type;
        this.pattern = pattern == null ? "" : pattern;
    }
}
