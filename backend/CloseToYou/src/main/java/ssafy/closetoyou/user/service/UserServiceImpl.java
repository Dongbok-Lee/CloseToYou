package ssafy.closetoyou.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.closetoyou.email.domain.EmailAuthentication;
import ssafy.closetoyou.email.service.port.EmailAuthenticationRepository;
import ssafy.closetoyou.global.error.errorcode.UserErrorCode;
import ssafy.closetoyou.global.error.exception.CloseToYouException;
import ssafy.closetoyou.user.controller.port.UserService;
import ssafy.closetoyou.user.controller.request.UserPasswordUpdateRequest;
import ssafy.closetoyou.user.controller.request.UserUpdateRequest;
import ssafy.closetoyou.user.controller.response.UserResponse;
import ssafy.closetoyou.user.domain.User;
import ssafy.closetoyou.user.controller.request.UserSignUp;
import ssafy.closetoyou.user.service.port.UserRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailAuthenticationRepository emailAuthenticationRepository;

    public Long signUp(UserSignUp userSignUp) {

        if (!emailAuthenticationRepository.isEmailAuthenticated(userSignUp.getEmail())){
            throw new CloseToYouException(UserErrorCode.NOT_AUTHENTICATED);
        }

        if (userRepository.existsUserByUserEmail(userSignUp.getEmail())) {
            throw new CloseToYouException(UserErrorCode.DUPLICATE_EMAIL);
        }

        User user = userSignUp.toModel();
        user.passwordEncode(passwordEncoder);
        return userRepository.saveUser(user).getUserId();
    }

    @Override
    public void deleteUser(Long userId) {

        if (!userRepository.existsUserByUserId(userId)) {
            throw new CloseToYouException(UserErrorCode.USER_NOT_FOUND);
        }

        userRepository.deleteUser(userId);
    }

    @Override
    public void changeUserPassword(User user, String oldPassword, String newPassword) {

        // oldPassword와 현재 DB에 있는 비밀번호랑 비교
        boolean isPasswordMatching = passwordEncoder.matches(oldPassword, user.getPassword());

        // 다를 경우 throw Exception
        if (!isPasswordMatching) {
            throw new CloseToYouException(UserErrorCode.USER_NOT_FOUND);
        }

        // 같을 경우, newPassword로 수정한 후 save
        userRepository.changeUserPassword(user.getUserId(), passwordEncoder.encode(newPassword));
    }

    @Override
    public void updateUser(Long userId, UserUpdateRequest userUpdateRequest) {
        userRepository.changeUser(userId, userUpdateRequest);
    }
}
