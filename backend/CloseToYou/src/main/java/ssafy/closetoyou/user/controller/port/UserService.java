package ssafy.closetoyou.user.controller.port;

import ssafy.closetoyou.user.controller.request.UserPasswordUpdateRequest;
import ssafy.closetoyou.user.controller.request.UserSignUp;
import ssafy.closetoyou.user.controller.request.UserUpdateRequest;
import ssafy.closetoyou.user.controller.response.UserResponse;
import ssafy.closetoyou.user.domain.User;

public interface UserService {
    Long signUp(UserSignUp userSignUp);
    void deleteUser(Long userId);
    void changeUserPassword(User user, String oldPassword, String newPassword);
    void updateUser(Long userId, UserUpdateRequest userUpdateRequest);
}
