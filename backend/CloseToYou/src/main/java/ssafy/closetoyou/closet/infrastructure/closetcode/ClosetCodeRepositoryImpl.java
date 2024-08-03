package ssafy.closetoyou.closet.infrastructure.closetcode;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import ssafy.closetoyou.closet.domain.ClosetCode;
import ssafy.closetoyou.closet.service.port.ClosetCodeRepository;
import ssafy.closetoyou.global.error.errorcode.ClosetErrorCode;
import ssafy.closetoyou.global.error.exception.CloseToYouException;

@Repository
@RequiredArgsConstructor
public class ClosetCodeRepositoryImpl implements ClosetCodeRepository {

    private final ClosetCodeJpaRepository closetCodeJpaRepository;

    @Override
    public boolean existsByClosetCode(String closetCode) {
        return closetCodeJpaRepository.existsByClosetCode(closetCode);
    }

    @Override
    public boolean isValidClosetCode(String closetCode) {
        return closetCodeJpaRepository.existsByClosetCodeAndIsUsed(closetCode, false);
    }

    @Override
    public void setClosetCodeIsUsed(String closetCode, boolean isUsed) {
        ClosetCodeEntity closetCodeEntity = closetCodeJpaRepository.findByClosetCode(closetCode)
                .orElseThrow(() -> new CloseToYouException(ClosetErrorCode.NO_CLOSET_CODE_EXCEPTION));
        closetCodeEntity.setIsUsed(isUsed);
        closetCodeJpaRepository.save(closetCodeEntity);
    }

    @Override
    public Long saveClosetCode(ClosetCode closetCode) {
        return closetCodeJpaRepository.save(ClosetCodeEntity.fromModel(closetCode)).getClosetCodeId();
    }
}