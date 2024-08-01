package ssafy.closetoyou.clothes.controller.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.closetoyou.clothes.domain.Clothes;
import ssafy.closetoyou.clothes.domain.Color;
import ssafy.closetoyou.clothes.domain.Pattern;
import ssafy.closetoyou.clothes.domain.Type;
import ssafy.closetoyou.global.error.errorcode.ClothesErrorCode;
import ssafy.closetoyou.global.error.exception.CloseToYouException;

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
    private Long closetId;

    public Clothes toModel() {
        return Clothes.builder()
                .nickname(nickname)
                .type(validateEnum(Type.class, type))
                .pattern(validateEnum(Pattern.class, pattern))
                .color(validateEnum(Color.class, color))
                .location(location)
                .closetId(closetId)
                .build();
    }

    public <E extends Enum<E>> E validateEnum(Class<E> enumClass, String value) {
        try {
            return Enum.valueOf(enumClass, value);
        } catch (IllegalArgumentException e) {
            throw new CloseToYouException(ClothesErrorCode.NO_ENUM_TYPE_EXCEPTION);
        }
    }

}
