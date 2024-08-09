package ssafy.closetoyou.closet.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.closetoyou.closetcode.controller.port.ClosetCodeService;
import ssafy.closetoyou.closet.controller.port.ClosetService;
import ssafy.closetoyou.closet.controller.request.ClosetRequest;
import ssafy.closetoyou.closet.controller.response.ClosetResponse;
import ssafy.closetoyou.closet.domain.Closet;
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
        checkClosetCodeValid(closetCode);
        closetCodeService.updateClosetCodeIsUsed(closetCode, true);

        checkClosetNicknameDuplicate(userId, closetRequest.getNickname());

        Closet closet = Closet.builder()
                .userId(userId)
                .closetCode(closetRequest.getClosetCode())
                .nickname(closetRequest.getNickname())
                .build();

        return closetRepository.saveCloset(closet).getClosetId();
    }

    @Override
    public void changeClosetNickname(Long userId, Long closetId, String nickname) {

        checkClosetNicknameDuplicate(userId, nickname);
        checkClosetExists(closetId);

        Closet closet = closetRepository.getClosetByClosetId(closetId);
        closet.updateNickname(nickname);
        closetRepository.saveCloset(closet);
    }

    @Override
    public void deleteCloset(Long userId, Long closetId) {

        checkClosetExists(closetId);

        Closet closet = closetRepository.getClosetByClosetId(closetId);

        closetCodeService.updateClosetCodeIsUsed(closet.getClosetCode(), false);
        closet.delete();
        closetRepository.saveCloset(closet);
    }

    @Override
    public List<ClosetResponse> getUserClosets(Long userId) {
        return closetRepository.getUserClosets(userId)
                .stream()
                .map(ClosetResponse::fromModel)
                .toList();
    }

    @Override
    public String getClosetNicknameByClosetId(Long closetId) {
        return closetRepository.getClosetByClosetId(closetId).getNickname();
    }

    private void checkClosetNicknameDuplicate(Long userId, String nickname) {
        if (closetRepository.existsClosetByClosetNickname(userId, nickname)) {
            throw new CloseToYouException(ClosetErrorCode.DUPLICATE_CLOSET_NICKNAME);
        }
    }

    private void checkClosetExists(Long closetId) {
        if (!closetRepository.existsClosetByClosetId(closetId)) {
            throw new CloseToYouException(ClosetErrorCode.NO_CLOSET_EXCEPTION);
        }
    }

    private void checkClosetCodeValid(String closetCode) {
        if (!closetCodeService.isValidClosetCode(closetCode)) {
            throw new CloseToYouException(ClosetErrorCode.NO_CLOSET_CODE_EXCEPTION);
        }
    }
}