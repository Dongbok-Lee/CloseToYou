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

    /*
    옷장을 등록하는 메서드
    1. 해당 옷장 코드가 존재하지 않거나 사용 중일 경우, 예외 처리
    2. 이미 한 개의 옷장을 등록하였는데, 또 등록하는 경우 예외 처리
    이 후, 옷장을 등록하기 전에 옷장 코드에 isUsed = true로 설정
     */
    @Override
    public Long addCloset(Long userId, ClosetRequest closetRequest) {

        String closetCode = closetRequest.getClosetCode();

        if (!closetCodeService.isValidClosetCode(closetCode)) {
            throw new CloseToYouException(ClosetErrorCode.NO_CLOSET_CODE_EXCEPTION);
        }

        if (!getUserClosets(userId).isEmpty()) {
            throw new CloseToYouException(ClosetErrorCode.CLOSET_ALREADY_REGISTERED);
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

    @Override
    public Long getClosetIdByUserId(Long userId) {
        List<Closet> closetList =  closetRepository.getUserClosets(userId);
        if (closetList.isEmpty()) {
            throw new CloseToYouException(ClosetErrorCode.NO_CLOSET_EXCEPTION);
        }
        /*
        현재는 유저가 하나의 옷장만 가지고 있다고 가정하지만,
        추후에 선택된 옷장의 옷장 아이디를 가져올 수 있음.
         */
        return closetList.get(0).getClosetId();
    }
}