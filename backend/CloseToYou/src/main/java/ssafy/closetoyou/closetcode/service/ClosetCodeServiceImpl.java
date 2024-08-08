package ssafy.closetoyou.closetcode.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.closetoyou.closetcode.controller.port.ClosetCodeService;
import ssafy.closetoyou.closetcode.domain.ClosetCode;
import ssafy.closetoyou.closetcode.service.port.ClosetCodeRepository;
import ssafy.closetoyou.global.common.util.RandomHolder;
import ssafy.closetoyou.global.error.errorcode.ClosetErrorCode;
import ssafy.closetoyou.global.error.exception.CloseToYouException;

@Service
@RequiredArgsConstructor
public class ClosetCodeServiceImpl implements ClosetCodeService {

    private final ClosetCodeRepository closetCodeRepository;
    private final RandomHolder randomHolder;

    @Override
    public boolean isValidClosetCode(String closetCode) {
        return closetCodeRepository.isValidClosetCode(closetCode);
    }

    @Override
    public void updateClosetCodeIsUsed(String closetCode, boolean isUsed) {
        closetCodeRepository.setClosetCodeIsUsed(closetCode, isUsed);
    }

    @Override
    public Long makeRandomClosetCodeAndSave() {
        ClosetCode closetCode = new ClosetCode();
        String randomCode = closetCode.makeRandomCode(randomHolder);

        if (closetCodeRepository.existsByClosetCode(randomCode)) {
            throw new CloseToYouException(ClosetErrorCode.DUPLICATE_CLOSET_CODE);
        }
        return closetCodeRepository.saveClosetCode(closetCode);
    }

}