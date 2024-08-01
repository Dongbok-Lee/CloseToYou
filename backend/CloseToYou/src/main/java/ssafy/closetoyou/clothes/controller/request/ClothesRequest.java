package ssafy.closetoyou.clothes.controller.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.closetoyou.clothes.domain.Clothes;
import ssafy.closetoyou.clothes.domain.Color;
import ssafy.closetoyou.clothes.domain.Pattern;
import ssafy.closetoyou.clothes.domain.Type;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ClothesRequest {
    @NotBlank
    private String nickname;
    @NotBlank
    private String type;
    @NotBlank
    private String pattern;
    @NotBlank
    private String color;
    private String location;
    @NotBlank
    private Long closetId;

    public Clothes toModel() {
        return Clothes.builder()
                .nickname(nickname)
                .type(Type.valueOf(type))
                .pattern(Pattern.valueOf(pattern))
                .color(Color.valueOf(color))
                .location(location)
                .closetId(closetId)
                .build();
    }
}
