package ssafy.closetoyou.clothes.controller.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import ssafy.closetoyou.clothes.domain.Clothes;

import java.time.LocalDate;
import java.time.LocalDateTime;

@ToString
@Getter
public class ClothesResponse {
    private Long clothesId;
    private String nickname;
    private String closetNickname;
    private String color;
    private String type;
    private String pattern;
    private String season;
    private String size;
    private String memo;
    private String location;
    private String imageUrl;
    private LocalDate lastWornDate;

    @Builder
    public ClothesResponse(Long clothesId, String nickname, String closetNickname, String color, String type, String pattern, String season, String size, String memo, String location, String imageUrl, LocalDate lastWornDate) {
        this.clothesId = clothesId;
        this.nickname = nickname;
        this.closetNickname = closetNickname;
        this.color = color;
        this.type = type;
        this.pattern = pattern;
        this.season = season;
        this.size = size;
        this.memo = memo;
        this.location = location;
        this.imageUrl = imageUrl;
        this.lastWornDate = lastWornDate;
    }

    public static ClothesResponse fromModel(Clothes clothes, String closetNickname) {
        return ClothesResponse.builder()
                .clothesId(clothes.getClothesId())
                .nickname(clothes.getNickname())
                .closetNickname(closetNickname)
                .color(String.valueOf(clothes.getColor()))
                .type(String.valueOf(clothes.getType()))
                .pattern(String.valueOf(clothes.getPattern()))
                .season(String.valueOf(clothes.getSeason()))
                .size(clothes.getSize())
                .memo(clothes.getMemo())
                .location(clothes.getLocation())
                .imageUrl(clothes.getImageUrl())
                .lastWornDate(clothes.getLastWornDate())
                .build();
    }
}