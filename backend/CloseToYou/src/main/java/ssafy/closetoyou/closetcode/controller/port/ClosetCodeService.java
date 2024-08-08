package ssafy.closetoyou.closetcode.controller.port;

public interface ClosetCodeService {
    boolean isValidClosetCode(String closetCode);
    void updateClosetCodeIsUsed(String closetCode, boolean isUsed);
    Long makeRandomClosetCodeAndSave();
}