package ssafy.closetoyou.clothes.controller.response;

import com.nimbusds.jose.crypto.impl.PRFParams;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import ssafy.closetoyou.clothes.domain.Clothes;

@ToString
@Getter
public class ClothesSummary {
    private Long clothesId;
    private String nickname;
    private String type;
    private String pattern;
    private String color;
    private String location;
    private String closetNickname;

    @Builder
    public ClothesSummary(Long clothesId, String nickname, String type, String pattern, String color, String location, String closetNickname) {
        this.clothesId = clothesId;
        this.nickname = nickname;
        this.type = type;
        this.pattern = pattern;
        this.color = color;
        this.location = location;
        this.closetNickname = closetNickname;
    }

    public static ClothesSummary fromModel(Clothes clothes, String closetNickname) {
        return ClothesSummary.builder()
                .clothesId(clothes.getClothesId())
                .nickname(clothes.getNickname())
                .type(String.valueOf(clothes.getType()))
                .pattern(String.valueOf(clothes.getPattern()))
                .color(String.valueOf(clothes.getColor()))
                .location(clothes.getLocation())
                .closetNickname(closetNickname)
                .build();
    }
}

