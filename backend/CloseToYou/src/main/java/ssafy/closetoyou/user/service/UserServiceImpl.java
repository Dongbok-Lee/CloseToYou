package ssafy.closetoyou.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.closetoyou.email.service.port.EmailAuthenticationRepository;
import ssafy.closetoyou.global.error.exception.CloseToYouException;
import ssafy.closetoyou.global.error.exception.ErrorCode;
import ssafy.closetoyou.user.controller.port.UserService;
import ssafy.closetoyou.user.domain.User;
import ssafy.closetoyou.user.domain.UserSignUp;
import ssafy.closetoyou.user.service.port.UserRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final EmailAuthenticationRepository emailAuthenticationRepository;
    private final PasswordEncoder passwordEncoder;

    public Long signUp(UserSignUp userSignUp) {

        User user = userSignUp.toModel();

        if (!emailAuthenticationRepository.isEmailAuthenticated(user.getEmail())){
            throw new CloseToYouException(ErrorCode.NOT_AUTHENTICATED);
        }

        if (userRepository.existsEmail(user.getEmail())) {
            throw new CloseToYouException(ErrorCode.DUPLICATE_EMAIL);
        }

        user.passwordEncode(passwordEncoder);
        return userRepository.saveUser(user).getUserId();
    }
}
