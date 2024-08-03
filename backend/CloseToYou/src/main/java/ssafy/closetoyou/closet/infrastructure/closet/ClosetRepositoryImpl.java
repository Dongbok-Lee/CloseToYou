package ssafy.closetoyou.closet.infrastructure.closet;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import ssafy.closetoyou.closet.controller.response.ClosetResponse;
import ssafy.closetoyou.closet.domain.Closet;
import ssafy.closetoyou.closet.service.port.ClosetRepository;
import ssafy.closetoyou.global.error.errorcode.ClosetErrorCode;
import ssafy.closetoyou.global.error.exception.CloseToYouException;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ClosetRepositoryImpl implements ClosetRepository {

    private final ClosetJpaRepository closetJpaRepository;

    @Override
    public Closet createCloset(Closet closet) {
        if (closetJpaRepository.existsByNickname(closet.getNickname())) {
            throw new CloseToYouException(ClosetErrorCode.DUPLICATE_CLOSET_NICKNAME);
        }
        return closetJpaRepository.save(ClosetEntity.fromModel(closet)).toModel();
    }

    @Override
    public boolean existsClosetByClosetNickname(String closetNickname) {
        return closetJpaRepository.existsByNickname(closetNickname);
    }

    @Override
    public void updateCloset(Long userId, Long closetId, String nickname) {
        ClosetEntity closetEntity = closetJpaRepository.findByUserIdAndClosetIdAndIsDeleted(userId, closetId, false)
                .orElseThrow(() -> new CloseToYouException(ClosetErrorCode.NO_CLOSET_EXCEPTION));
        closetEntity.setNickname(nickname);
        closetJpaRepository.save(closetEntity);
    }

    @Override
    public void deleteCloset(Long userId, Long closetId) {
        ClosetEntity closetEntity = closetJpaRepository.findByUserIdAndClosetIdAndIsDeleted(userId, closetId, false)
                .orElseThrow(() -> new CloseToYouException(ClosetErrorCode.NO_CLOSET_EXCEPTION));

        closetEntity.setIsDeleted(true);
        closetJpaRepository.save(closetEntity);
    }

    @Override
    public List<Closet> getUserClosets(Long userId) {
        return closetJpaRepository.findClosetsByUserIdAndIsDeleted(userId, false)
                .orElseThrow(() -> new CloseToYouException(ClosetErrorCode.NO_CLOSET_EXCEPTION))
                .stream()
                .map(ClosetEntity::toModel)
                .toList();
    }
}