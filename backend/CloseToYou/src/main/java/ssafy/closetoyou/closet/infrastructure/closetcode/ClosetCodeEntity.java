package ssafy.closetoyou.closet.infrastructure.closetcode;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity(name = "closet_codes")
@Getter @Setter @ToString
public class ClosetCodeEntity {
    @Id
    @GeneratedValue
    private Long closetCodeId;
    private String closetCode;
    private Boolean isUsed;
}
