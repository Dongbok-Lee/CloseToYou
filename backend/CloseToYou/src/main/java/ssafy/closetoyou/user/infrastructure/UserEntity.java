package ssafy.closetoyou.user.infrastructure;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import ssafy.closetoyou.user.domain.User;

import java.time.LocalDateTime;

import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity(name = "users")
@Getter
@NoArgsConstructor(access = PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class UserEntity {

    @Id @GeneratedValue(strategy = IDENTITY)
    private Long userId;

    private String nickname;

    private String password;

    @Email
    private String email;

    private Boolean isDeleted;
    private Boolean isHighContrast;

    @CreatedDate
    private LocalDateTime createdDateTime;

    @LastModifiedDate
    private LocalDateTime updatedDateTime;

    @Builder
    public UserEntity(Long userId, String nickname, String password, String email, Boolean isDeleted, Boolean isHighContrast) {
        this.userId = userId;
        this.nickname = nickname;
        this.password = password;
        this.email = email;
        this.isDeleted = isDeleted;
        this.isHighContrast = isHighContrast;
    }

    public static UserEntity fromModel(User user) {
        return builder()
                .userId(user.getUserId())
                .nickname(user.getNickname())
                .password(user.getPassword())
                .email(user.getEmail())
                .isDeleted(user.getIsDeleted() != null && user.getIsDeleted())
                .isHighContrast(user.getIsHighContrast() != null && user.getIsHighContrast())
                .build();
    }

    public User toModel() {
        return User.builder()
                .userId(userId)
                .nickname(nickname)
                .password(password)
                .email(email)
                .createdDateTime(createdDateTime)
                .updatedDateTime(updatedDateTime)
                .isDeleted(isDeleted)
                .isHighContrast(isHighContrast)
                .build();
    }

}
