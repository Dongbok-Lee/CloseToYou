package ssafy.closetoyou.clothes.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import ssafy.closetoyou.clothes.controller.request.ClothesUpdateRequest;
import ssafy.closetoyou.global.error.errorcode.ClothesErrorCode;
import ssafy.closetoyou.global.error.exception.CloseToYouException;

import java.time.LocalDate;
import java.time.LocalDateTime;
@ToString
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
    private int wearingCount;
    private String location;
    private Long closetId;
    private LocalDateTime createdDateTime;
    private LocalDateTime updatedDateTime;
    private LocalDate lastWornDate;

    @Builder
    public Clothes(Long clothesId, String nickname, Type type, Pattern pattern, Color color, String size, String texture, String memo, int wearingCount, String location, Long closetId, LocalDateTime createdDateTime, LocalDateTime updatedDateTime, LocalDate lastWornDate) {
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
        if (clothesUpdateRequest.getNickname() != null) this.nickname = clothesUpdateRequest.getNickname();
        if (clothesUpdateRequest.getType() != null) this.type = validateEnum(Type.class, clothesUpdateRequest.getType());
        if (clothesUpdateRequest.getPattern() != null) this.pattern = validateEnum(Pattern.class, clothesUpdateRequest.getPattern());
        if (clothesUpdateRequest.getColor() != null) this.color = validateEnum(Color.class, clothesUpdateRequest.getColor());
        if (clothesUpdateRequest.getMemo() != null) this.memo = clothesUpdateRequest.getMemo();
    }

    public <E extends Enum<E>> E validateEnum(Class<E> enumClass, String value) {
        try {
            return Enum.valueOf(enumClass, value);
        } catch (IllegalArgumentException e) {
            throw new CloseToYouException(ClothesErrorCode.NO_ENUM_TYPE_EXCEPTION);
        }
    }
}
