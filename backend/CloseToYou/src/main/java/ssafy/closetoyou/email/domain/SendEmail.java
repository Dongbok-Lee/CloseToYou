package ssafy.closetoyou.email.domain;

import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access= PROTECTED)
public class SendEmail {
    @Email
    String email;
}
