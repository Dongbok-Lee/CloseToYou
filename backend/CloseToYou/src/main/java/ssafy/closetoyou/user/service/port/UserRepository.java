package ssafy.closetoyou.user.service.port;

import ssafy.closetoyou.user.domain.User;

public interface UserRepository {
    User saveUser(User user);
    boolean existsEmail(String email);

    User findById(Long id);
    User findByEmail(String email);
}
