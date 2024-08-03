package ssafy.closetoyou.closet.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.closetoyou.closet.controller.port.ClosetCodeService;
import ssafy.closetoyou.closet.controller.port.ClosetService;
import ssafy.closetoyou.closet.controller.request.ClosetRequest;
import ssafy.closetoyou.closet.controller.response.ClosetResponse;
import ssafy.closetoyou.closet.domain.Closet;
import ssafy.closetoyou.closet.service.port.ClosetCodeRepository;
import ssafy.closetoyou.closet.service.port.ClosetRepository;
import ssafy.closetoyou.global.error.errorcode.ClosetErrorCode;
import ssafy.closetoyou.global.error.exception.CloseToYouException;

import java.util.List;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ClosetServiceImpl implements ClosetService {

    private final ClosetCodeService closetCodeService;
    private final ClosetRepository closetRepository;

    @Override
    public Long addCloset(Long userId, ClosetRequest closetRequest) {

        String closetCode = closetRequest.getClosetCode();

        if (!closetCodeService.existClosetCode(closetCode)) {
            throw new CloseToYouException(ClosetErrorCode.NO_CLOSET_CODE_EXCEPTION);
        }

        closetCodeService.setClosetCodeIsUsed(closetCode, true);

        Closet closet = Closet.builder()
                .userId(userId)
                .closetCode(closetRequest.getClosetCode())
                .nickname(closetRequest.getNickname())
                .build();

        return closetRepository.createCloset(closet).getClosetId();
    }

    @Override
    public void changeClosetInfo(Long userId, Long closetId, String nickname) {

        if (closetRepository.existsClosetByClosetNickname(nickname)) {
            throw new CloseToYouException(ClosetErrorCode.DUPLICATE_CLOSET_NICKNAME);
        }

        closetRepository.updateCloset(userId, closetId, nickname);
    }

    @Override
    public void deleteCloset(Long userId, Long closetId) {
        closetRepository.deleteCloset(userId, closetId);
    }

    @Override
    public List<ClosetResponse> getUserClosets(Long userId) {
        return closetRepository.getUserClosets(userId)
                .stream()
                .map(ClosetResponse::fromModel)
                .toList();
    }
}