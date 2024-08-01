package ssafy.closetoyou.clothes.controller.response;

import lombok.Builder;
import ssafy.closetoyou.clothes.domain.Clothes;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ClothesResponse {
    private Long clothesId;
    private String nickname;
    private String type;
    private String pattern;
    private String color;
    private String size;
    private String memo;
    private Long wearingCount;
    private String location;
    private Boolean deleted;
    private LocalDateTime registTime;
    private LocalDateTime updateTime;
    private LocalDate lastWornDate;

    @Builder
    public ClothesResponse(Long clothesId, String nickname, String type, String pattern, String color, String size, String memo, Long wearingCount, String location, Boolean deleted, LocalDateTime registTime, LocalDateTime updateTime, LocalDate lastWornDate) {
        this.clothesId = clothesId;
        this.nickname = nickname;
        this.type = type;
        this.pattern = pattern;
        this.color = color;
        this.size = size;
        this.memo = memo;
        this.wearingCount = wearingCount;
        this.location = location;
        this.deleted = deleted;
        this.registTime = registTime;
        this.updateTime = updateTime;
        this.lastWornDate = lastWornDate;
    }

    public static ClothesResponse fromModel(Clothes clothes) {
        return ClothesResponse.builder()
                .clothesId(clothes.getClothesId())
                .nickname(clothes.getNickname())
                .type(clothes.getType().name())
                .pattern(clothes.getPattern().name())
                .color(clothes.getColor().name())
                .size(clothes.getSize())
                .wearingCount(clothes.getWearingCount())
                .location(clothes.getLocation())
                .deleted(true)
                .registTime(clothes.getCreatedDateTime())
                .updateTime(clothes.getUpdatedDateTime())
                .lastWornDate(clothes.getLastWornDate())
                .build();
    }
}
