package ssafy.closetoyou.user.controller.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.closetoyou.user.domain.User;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class UserSignUp {

    @NotBlank
    private String nickname;

    @NotBlank
    private String password;

    @Email
    @NotBlank
    private String email;

    public UserSignUp(String nickname, String password, String email) {
        this.nickname = nickname;
        this.password = password;
        this.email = email;
    }

    public User toModel() {
        return User.builder()
                .nickname(nickname)
                .password(password)
                .email(email)
                .build();
    }
}
