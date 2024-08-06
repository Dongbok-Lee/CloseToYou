package ssafy.closetoyou.closetcode.infrastructure;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import ssafy.closetoyou.closetcode.domain.ClosetCode;

@Entity(name = "closet_codes")
@Getter @Setter @ToString
@NoArgsConstructor
public class ClosetCodeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long closetCodeId;
    private String closetCode;
    private Boolean isUsed;

    @Builder
    public ClosetCodeEntity(Long closetCodeId, String closetCode, Boolean isUsed) {
        this.closetCodeId = closetCodeId;
        this.closetCode = closetCode;
        this.isUsed = isUsed;
    }

    public static ClosetCodeEntity fromModel(ClosetCode closetCode) {
        return ClosetCodeEntity.builder()
                .closetCodeId(closetCode.getClosetCodeId())
                .closetCode(closetCode.getClosetCode())
                .isUsed(closetCode.getIsUsed())
                .build();
    }
}