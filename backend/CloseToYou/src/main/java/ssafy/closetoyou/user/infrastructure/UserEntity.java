package ssafy.closetoyou.user.infrastructure;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import ssafy.closetoyou.user.domain.User;

import java.time.LocalDateTime;

import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity(name = "user")
@Getter @Setter
@NoArgsConstructor(access = PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class UserEntity {

    @Id @GeneratedValue(strategy = IDENTITY)
    private Long userId;

    private String nickname;

    private String password;

    @Email
    @Column(unique = true)
    private String email;

    private Boolean isHighContrast;

    private boolean isDeleted;

    @CreatedDate
    private LocalDateTime createdDateTime;

    @LastModifiedDate
    private LocalDateTime updatedDateTime;

    @Builder
    public UserEntity(Long userId, String nickname, String password, String email, boolean isHighContrast, boolean isDeleted) {
        this.userId = userId;
        this.nickname = nickname;
        this.password = password;
        this.email = email;
        this.isHighContrast = isHighContrast;
        this.isDeleted = isDeleted;
    }

    public static UserEntity fromModel(User user){
        return builder()
                .nickname(user.getNickname())
                .password(user.getPassword())
                .email(user.getEmail())
                .isHighContrast(user.isHighContrast())
                .isDeleted(user.isDeleted())
                .build();
    }

    public User toModel() {
        return User.builder()
                .userId(userId)
                .nickname(nickname)
                .password(password)
                .email(email)
                .isHighContrast(isHighContrast)
                .createdDateTime(createdDateTime)
                .updatedDateTime(updatedDateTime)
                .isDeleted(isDeleted)
                .build();
    }
}
