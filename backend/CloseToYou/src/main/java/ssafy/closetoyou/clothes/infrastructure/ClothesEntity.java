package ssafy.closetoyou.clothes.infrastructure;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import ssafy.closetoyou.clothes.domain.Clothes;
import ssafy.closetoyou.clothes.domain.Color;
import ssafy.closetoyou.clothes.domain.Pattern;
import ssafy.closetoyou.clothes.domain.Type;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "clothes")
@Getter @Setter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class ClothesEntity {

    @Id
    @GeneratedValue
    private Long clothesId;
    private Long closetId;

    @Column(unique = true)
    private String nickname;
    private String type;
    private String pattern;
    private String color;
    private String size;
    private String texture;
    private String memo;
    private int wearingCount;
    private String location;
    private boolean isDeleted;

    @CreatedDate
    private LocalDateTime createdDateTime;

    @LastModifiedDate
    private LocalDateTime updatedDateTime;
    private LocalDate lastWornDate;

    @Builder
    public ClothesEntity(Long clothesId, Long closetId, String nickname, String type, String pattern, String color, String size, String texture, String memo, int wearingCount, String location, boolean isDeleted, LocalDateTime createdDateTime, LocalDateTime updatedDateTime, LocalDate lastWornDate) {
        this.clothesId = clothesId;
        this.closetId = closetId;
        this.nickname = nickname;
        this.type = type;
        this.pattern = pattern;
        this.color = color;
        this.size = size;
        this.texture = texture;
        this.memo = memo;
        this.wearingCount = wearingCount;
        this.location = location;
        this.isDeleted = isDeleted;
        this.createdDateTime = createdDateTime;
        this.updatedDateTime = updatedDateTime;
        this.lastWornDate = lastWornDate;
    }

    public static ClothesEntity fromModel(Clothes clothes) {
        return ClothesEntity.builder()
                .clothesId(clothes.getClothesId())
                .closetId(clothes.getClosetId())
                .nickname(clothes.getNickname())
                .type(String.valueOf(clothes.getType()))
                .pattern(String.valueOf(clothes.getPattern()))
                .color(String.valueOf(clothes.getColor()))
                .size(clothes.getSize())
                .texture(clothes.getTexture())
                .memo(clothes.getMemo())
                .wearingCount(0)
                .location(clothes.getLocation())
                .isDeleted(false)
                .build();
    }

    public Clothes toModel() {
        return Clothes.builder()
                .clothesId(this.getClothesId())
                .closetId(this.getClosetId())
                .nickname(this.getNickname())
                .type(Type.valueOf(this.getType()))
                .pattern(Pattern.valueOf(this.getPattern()))
                .color(Color.valueOf(this.getColor()))
                .size(this.getSize())
                .texture(this.getTexture())
                .memo(this.getMemo())
                .wearingCount(this.getWearingCount())
                .location(this.getLocation())
                .createdDateTime(this.getCreatedDateTime())
                .updatedDateTime(this.getUpdatedDateTime())
                .lastWornDate(this.getLastWornDate())
                .build();
    }
}
