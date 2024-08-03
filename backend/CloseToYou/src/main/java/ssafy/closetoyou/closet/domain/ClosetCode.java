package ssafy.closetoyou.closet.domain;

import lombok.Builder;
import lombok.Getter;
import ssafy.closetoyou.global.common.util.RandomHolder;

@Getter
public class ClosetCode {
    private Long closetCodeId;
    private String closetCode;
    private Boolean isUsed;

    public ClosetCode() {
        this.isUsed = false;
    }

    public String makeRandomCode(RandomHolder randomHolder) {
        String randomCode = randomHolder.getRandomClosetCode();
        closetCode = randomCode;
        return randomCode;
    }
}
