package ssafy.closetoyou.user.infrastructure;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import ssafy.closetoyou.email.service.port.EmailAuthenticationRepository;
import ssafy.closetoyou.global.error.errorcode.UserErrorCode;
import ssafy.closetoyou.global.error.exception.CloseToYouException;
import ssafy.closetoyou.user.controller.request.UserUpdateRequest;
import ssafy.closetoyou.user.domain.User;
import ssafy.closetoyou.user.service.port.UserRepository;


@RequiredArgsConstructor
@Repository
public class UserRepositoryImpl implements UserRepository {

    private final UserJpaRepository userJpaRepository;

    public User saveUser(User user) {
        return userJpaRepository.save(UserEntity.fromModel(user)).toModel();
    }

    public boolean existsUserByUserEmail(String userEmail) {
        return userJpaRepository.existsByEmailAndIsDeleted(userEmail, false);
    }

    @Override
    public boolean existsUserByUserId(Long userId) {
        return userJpaRepository.existsByUserIdAndIsDeleted(userId, false);
    }

    @Override
    public User findByUserId(Long userId) {
        return userJpaRepository.findByUserIdAndIsDeleted(userId, false).orElseThrow(
                () -> new CloseToYouException(UserErrorCode.NOT_EXIST_USER)).toModel();
    }

    @Override
    public User findByUserEmail(String userEmail) {
        return userJpaRepository.findByEmailAndIsDeleted(userEmail, false).orElseThrow(
                () -> new CloseToYouException(UserErrorCode.NOT_EXIST_USER)).toModel();
    }

    @Override
    public void deleteUser(Long userId) {
        UserEntity userEntity = userJpaRepository.findByUserIdAndIsDeleted(userId, false).orElseThrow(
                () -> new CloseToYouException(UserErrorCode.NOT_EXIST_USER)
        );
        userEntity.setDeleted(true);
        userJpaRepository.save(userEntity);
    }

    @Override
    public void changeUserPassword(Long userId, String newPassword) {
        UserEntity userEntity = userJpaRepository.findByUserIdAndIsDeleted(userId, false).orElseThrow(
                () -> new CloseToYouException(UserErrorCode.NOT_EXIST_USER)
        );
        userEntity.setPassword(newPassword);
        userJpaRepository.save(userEntity);;
    }

    @Override
    public void changeUser(Long userId, UserUpdateRequest userUpdateRequest) {
        UserEntity userEntity = userJpaRepository.findByUserIdAndIsDeleted(userId, false).orElseThrow(
                () -> new CloseToYouException(UserErrorCode.NOT_EXIST_USER)
        );
        userEntity.setNickname(userUpdateRequest.getNickname());
        userEntity.setIsHighContrast(userUpdateRequest.getIsHighContrast());
        userJpaRepository.save(userEntity);
    }

}
