package ssafy.closetoyou.closet.service.port;

public interface ClosetCodeRepository {
    boolean existClosetCode(String closetCode);
    void setClosetCodeIsUsed(String closetCode, boolean isUsed);
}