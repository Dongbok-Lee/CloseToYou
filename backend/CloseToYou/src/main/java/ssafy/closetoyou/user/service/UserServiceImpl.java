package ssafy.closetoyou.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.closetoyou.email.controller.port.EmailAuthenticationService;
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
    private final EmailAuthenticationService emailAuthenticationService;

    public Long signUp(UserSignUp userSignUp) {
        validateSignUpEmail(userSignUp.getEmail());
        User user = userSignUp.toModel();
        user.passwordEncode(passwordEncoder);
        return userRepository.saveUser(user).getUserId();
    }

    @Override
    public void removeUser(Long userId) {
        userRepository.deleteUser(userId);
    }

    @Override
    public void changeUserPassword(User user, String oldPassword, String newPassword) {

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new CloseToYouException(UserErrorCode.USER_NOT_FOUND);
        }

        userRepository.changeUserPassword(user.getUserId(), passwordEncoder.encode(newPassword));
    }

    @Override
    public void updateUser(Long userId, UserUpdateRequest userUpdateRequest) {
        userRepository.changeUser(userId, userUpdateRequest);
    }

    public void validateSignUpEmail(String email) {
        emailAuthenticationService.checkEmailAuthenticated(email);

        if (userRepository.existsUserByUserEmail(email)) {
            throw new CloseToYouException(UserErrorCode.DUPLICATE_EMAIL);
        }
    }
}
