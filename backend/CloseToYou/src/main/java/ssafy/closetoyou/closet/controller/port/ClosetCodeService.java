package ssafy.closetoyou.closet.controller.port;

public interface ClosetCodeService {
    boolean existClosetCode(String closetCode);
    void setClosetCodeIsUsed(String closetCode, boolean isUsed);
}