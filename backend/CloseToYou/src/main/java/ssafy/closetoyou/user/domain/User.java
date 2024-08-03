package ssafy.closetoyou.user.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Getter
@ToString
public class User {

    private Long userId;
    private String nickname;
    private String password;
    private String email;
    private Boolean isHighContrast;
    private LocalDateTime createdDateTime;
    private LocalDateTime updatedDateTime;
    private Boolean isDeleted;

    @Builder
    public User(Long userId, String nickname, String password, String email, Boolean isHighContrast, LocalDateTime createdDateTime, LocalDateTime updatedDateTime, Boolean isDeleted) {
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
