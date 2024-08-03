package ssafy.closetoyou.closet.service.port;

import ssafy.closetoyou.closet.domain.ClosetCode;

public interface ClosetCodeRepository {
    boolean existsByClosetCode(String closetCode);
    boolean isValidClosetCode(String closetCode);
    void setClosetCodeIsUsed(String closetCode, boolean isUsed);
    Long saveClosetCode(ClosetCode closetCode);
}