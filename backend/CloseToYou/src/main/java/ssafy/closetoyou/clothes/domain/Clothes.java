package ssafy.closetoyou.clothes.domain;

import lombok.Builder;
import lombok.Getter;
import ssafy.closetoyou.clothes.controller.request.ClothesUpdateRequest;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class Clothes {
    private Long clothesId;
    private String nickname;
    private Type type;
    private Pattern pattern;
    private Color color;
    private String size;
    private String texture;
    private String memo;
    private Long wearingCount;
    private String location;
    private Long closetId;
    private LocalDateTime createdDateTime;
    private LocalDateTime updatedDateTime;
    private LocalDate lastWornDate;

    @Builder
    public Clothes(Long clothesId, String nickname, Type type, Pattern pattern, Color color, String size, String texture, String memo, Long wearingCount, String location, Long closetId, LocalDateTime createdDateTime, LocalDateTime updatedDateTime, LocalDate lastWornDate) {
        this.clothesId = clothesId;
        this.nickname = nickname;
        this.type = type;
        this.pattern = pattern;
        this.color = color;
        this.size = size;
        this.texture = texture;
        this.memo = memo;
        this.wearingCount = wearingCount;
        this.location = location;
        this.closetId = closetId;
        this.createdDateTime = createdDateTime;
        this.updatedDateTime = updatedDateTime;
        this.lastWornDate = lastWornDate;
    }

    public void changeClothesInfo(ClothesUpdateRequest clothesUpdateRequest) {
        this.nickname = clothesUpdateRequest.getNickname();
        this.type = Type.valueOf(clothesUpdateRequest.getType());
        this.pattern = Pattern.valueOf(clothesUpdateRequest.getPattern());
        this.color = Color.valueOf(clothesUpdateRequest.getColor());
        this.memo = clothesUpdateRequest.getMemo();
    }
}
