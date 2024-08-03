package ssafy.closetoyou.closetcode.controller.port;

public interface ClosetCodeService {
    boolean isValidClosetCode(String closetCode);
    void setClosetCodeIsUsed(String closetCode, boolean isUsed);
    Long makeRandomClosetCodeAndSave();
}