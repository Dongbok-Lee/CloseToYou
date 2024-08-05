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
    private Long closetId;
    private Long nfcId;
    private String location;
    private String nickname;
    private Type type;
    private Pattern pattern;
    private Color color;
    private Season season;
    private String size;
    private String memo;
    private int wearingCount;
    private Boolean isDeleted;
    private String imageUrl;
    private LocalDateTime createdDateTime;
    private LocalDateTime updatedDateTime;
    private LocalDate lastWornDate;

    @Builder
    public Clothes(Long clothesId, Long closetId, Long nfcId, String location, String nickname, Type type, Pattern pattern, Color color, Season season, String size, String memo, int wearingCount, Boolean isDeleted, String imageUrl, LocalDateTime createdDateTime, LocalDateTime updatedDateTime, LocalDate lastWornDate) {
        this.clothesId = clothesId;
        this.closetId = closetId;
        this.nfcId = nfcId;
        this.location = location;
        this.nickname = nickname;
        this.type = type;
        this.pattern = pattern;
        this.color = color;
        this.season = season;
        this.size = size;
        this.memo = memo;
        this.wearingCount = wearingCount;
        this.isDeleted = isDeleted;
        this.imageUrl = imageUrl;
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
        this.season = clothesUpdateRequest.getSeason();
        this.size = clothesUpdateRequest.getSize();
    }
}
