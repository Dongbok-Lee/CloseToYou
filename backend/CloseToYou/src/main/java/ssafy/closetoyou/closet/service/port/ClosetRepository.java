package ssafy.closetoyou.closet.service.port;

import ssafy.closetoyou.closet.controller.response.ClosetResponse;
import ssafy.closetoyou.closet.domain.Closet;

import java.util.List;

public interface ClosetRepository {
    Closet createCloset(Closet closet);
    boolean existsClosetByClosetNickname(String closetNickname);
    void updateCloset(Long userId, Long closetId, String nickname);
    void deleteCloset(Long closetId, Long userId);
    List<Closet> getUserClosets(Long userId);
}