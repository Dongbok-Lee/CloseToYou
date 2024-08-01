package ssafy.closetoyou.user.domain;

import lombok.Builder;
import lombok.Getter;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Getter
public class User {

    private Long userId;
    private String nickname;
    private String password;
    private String email;
    private boolean isHighContrast;
    private LocalDateTime createdDateTime;
    private LocalDateTime updatedDateTime;
    private boolean isDeleted;

    @Builder
    public User(Long userId, String nickname, String password, String email, boolean isHighContrast, LocalDateTime createdDateTime, LocalDateTime updatedDateTime, boolean isDeleted) {
        this.userId = userId;
        this.nickname = nickname;
        this.password = password;
        this.email = email;
        this.isHighContrast = isHighContrast;
        this.createdDateTime = createdDateTime;
        this.updatedDateTime = updatedDateTime;
        this.isDeleted = isDeleted;
    }

    public void passwordEncode(PasswordEncoder passwordEncoder) {
        password = passwordEncoder.encode(password);
    }
}
