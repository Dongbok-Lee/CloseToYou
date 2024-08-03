package ssafy.closetoyou.clothes.controller.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.closetoyou.clothes.domain.Clothes;
import ssafy.closetoyou.clothes.domain.Color;
import ssafy.closetoyou.clothes.domain.Pattern;
import ssafy.closetoyou.clothes.domain.Type;
import ssafy.closetoyou.global.common.util.ValidEnum;
import ssafy.closetoyou.global.error.errorcode.ClothesErrorCode;
import ssafy.closetoyou.global.error.exception.CloseToYouException;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ClothesRequest {

    @NotBlank
    private String nickname;

    @NotBlank
    @ValidEnum(enumClass = Type.class)
    private String type;

    @NotBlank
    @ValidEnum(enumClass = Pattern.class)
    private String pattern;

    @NotBlank
    @ValidEnum(enumClass = Color.class)
    private String color;

    private String location;
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
