package ssafy.closetoyou.user.service.port;

import ssafy.closetoyou.user.controller.request.UserUpdateRequest;
import ssafy.closetoyou.user.domain.User;

public interface UserRepository {
    User saveUser(User user);
    boolean existsUserByUserEmail(String userEmail);
    boolean existsUserByUserId(Long userId);
    User findUserByUserId(Long userId);
    User findUserByUserEmail(String userEmail);
    void deleteUser(Long userId);
    void changeUserPassword(Long userId, String newPassword);
    void changeUser(Long userId, UserUpdateRequest userUpdateRequest);
}
