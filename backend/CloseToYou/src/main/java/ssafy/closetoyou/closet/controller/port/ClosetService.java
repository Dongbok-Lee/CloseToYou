package ssafy.closetoyou.closet.controller.port;

import ssafy.closetoyou.closet.controller.request.ClosetRequest;
import ssafy.closetoyou.closet.controller.response.ClosetResponse;

import java.util.List;

public interface ClosetService {
    Long createCloset(ClosetRequest closetRequest);
    List<ClosetResponse> findAllCloset(Long userId);
    void changeClosetInfo(String nickname);
    void deleteCloset(Long closetId, Long userId);
}
