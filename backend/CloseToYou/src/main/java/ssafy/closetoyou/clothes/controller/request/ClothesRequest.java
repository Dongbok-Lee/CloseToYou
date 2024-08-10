package ssafy.closetoyou.clothes.controller.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.closetoyou.closet.domain.Closet;
import ssafy.closetoyou.clothes.domain.Clothes;
import ssafy.closetoyou.clothes.domain.Color;
import ssafy.closetoyou.clothes.domain.Pattern;
import ssafy.closetoyou.clothes.domain.Type;
import ssafy.closetoyou.global.error.errorcode.ClothesErrorCode;
import ssafy.closetoyou.global.error.exception.CloseToYouException;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ClothesRequest {

    @NotNull
    private Type type;

    @NotNull
    private Pattern pattern;

    @NotNull
    private Color color;

    @NotNull
    private String location;

    @NotNull
    private Long closetId;

    @NotNull
    private String imageUrl;

    public Clothes toModel() {
        return Clothes.builder()
                .type(type)
                .color(color)
                .pattern(pattern)
                .location(location)
                .closet(Closet.builder().closetId(closetId).build())
                .imageUrl(imageUrl)
                .build();
    }


}