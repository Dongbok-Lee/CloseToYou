package ssafy.closetoyou.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.closetoyou.email.controller.port.EmailAuthenticationService;
import ssafy.closetoyou.global.error.errorcode.UserErrorCode;
import ssafy.closetoyou.global.error.exception.CloseToYouException;
import ssafy.closetoyou.user.controller.port.UserService;
import ssafy.closetoyou.user.controller.request.UserUpdateRequest;
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
        user.passwordEncode(passwordEncoder, user.getPassword());
        return userRepository.saveUser(user).getUserId();
    }

    @Override
    public void removeUser(Long userId) {

        checkUserExists(userId);

        User user = userRepository.findUserByUserId(userId);
        user.delete();
        userRepository.saveUser(user);
    }

    @Override
    public void changeUserPassword(Long userId, String oldPassword, String newPassword) {

        checkUserExists(userId);
        User user = userRepository.findUserByUserId(userId);

        checkPasswordMatch(oldPassword, user.getPassword());
        user.passwordEncode(passwordEncoder, newPassword);

        userRepository.saveUser(user);

    }

    @Override
    public void updateUser(Long userId, UserUpdateRequest userUpdateRequest) {

        checkUserExists(userId);

        User user = userRepository.findUserByUserId(userId);

        user.updateUserInfo(userUpdateRequest);
        userRepository.saveUser(user);

    }

    private void checkPasswordMatch(CharSequence oldPassword, String newPassword) {
        if (!passwordEncoder.matches(oldPassword, newPassword)) {
            throw new CloseToYouException(UserErrorCode.NO_MATCH_PASSWORD);
        }
    }

    public void validateSignUpEmail(String email) {
        emailAuthenticationService.checkEmailAuthenticated(email);
        if (userRepository.existsUserByUserEmail(email)) {
            throw new CloseToYouException(UserErrorCode.DUPLICATE_EMAIL);
        }
    }

    private void checkUserExists(Long userId) {
        if (!userRepository.existsUserByUserId(userId)) {
            throw new CloseToYouException(UserErrorCode.USER_NOT_FOUND);
        }
    }

}