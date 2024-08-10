package ssafy.closetoyou.closetcode.service.port;

import ssafy.closetoyou.closetcode.domain.ClosetCode;

public interface ClosetCodeRepository {
    boolean existsByClosetCode(String closetCode);
    boolean isValidClosetCode(String closetCode);
    Long saveClosetCode(ClosetCode closetCode);
    ClosetCode findClosetCodeByClosetCode(String closetCode);
}