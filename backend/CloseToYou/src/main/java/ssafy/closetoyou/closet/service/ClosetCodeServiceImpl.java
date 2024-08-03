package ssafy.closetoyou.closet.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.closetoyou.closet.controller.port.ClosetCodeService;
import ssafy.closetoyou.closet.service.port.ClosetCodeRepository;

@Service
@RequiredArgsConstructor
public class ClosetCodeServiceImpl implements ClosetCodeService {

    private final ClosetCodeRepository closetCodeRepository;

    @Override
    public boolean existClosetCode(String closetCode) {
        return closetCodeRepository.existClosetCode(closetCode);
    }

    @Override
    public void setClosetCodeIsUsed(String closetCode, boolean isUsed) {
        closetCodeRepository.setClosetCodeIsUsed(closetCode, isUsed);
    }


}
