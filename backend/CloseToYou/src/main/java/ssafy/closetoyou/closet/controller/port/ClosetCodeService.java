package ssafy.closetoyou.closet.controller.port;

public interface ClosetCodeService {
    boolean isValidClosetCode(String closetCode);
    void setClosetCodeIsUsed(String closetCode, boolean isUsed);
    Long makeRandomClosetCodeAndSave();
}