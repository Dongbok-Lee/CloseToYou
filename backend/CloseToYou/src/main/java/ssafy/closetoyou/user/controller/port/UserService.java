package ssafy.closetoyou.user.controller.port;

import ssafy.closetoyou.user.controller.request.UserSignUp;

public interface UserService {
    Long signUp(UserSignUp userSignUp);
    boolean checkEmailDuplicated(String email);
}
