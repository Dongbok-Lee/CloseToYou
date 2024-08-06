package ssafy.closetoyou.user.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ssafy.closetoyou.global.security.login.userdetail.CustomUserDetail;
import ssafy.closetoyou.user.controller.port.UserService;
import ssafy.closetoyou.user.controller.request.UserPasswordUpdateRequest;
import ssafy.closetoyou.user.controller.request.UserSignUp;
import ssafy.closetoyou.user.controller.request.UserUpdateRequest;
import ssafy.closetoyou.user.controller.response.UserResponse;
import ssafy.closetoyou.global.common.response.SuccessResponse;
import ssafy.closetoyou.user.domain.User;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<SuccessResponse<UserResponse>> getUserInformation(Authentication authentication) {
        User user = ((CustomUserDetail) authentication.getPrincipal()).getUser();
        UserResponse userResponse = UserResponse.fromModel(user);
        return ResponseEntity.ok(
                new SuccessResponse<>("유저 조회에 성공하였습니다.", userResponse));
    }

    @PostMapping
    public ResponseEntity<SuccessResponse<Long>> SignUpUser (@Valid @RequestBody UserSignUp userSignUp) {
        Long userId = userService.signUp(userSignUp);

        return ResponseEntity.ok(
                new SuccessResponse<>("일반 이용자 회원가입 성공", userId));
    }

    @DeleteMapping
    public ResponseEntity<SuccessResponse<Long>> deleteUser(Authentication authentication) {
        Long userId = ((CustomUserDetail) authentication.getPrincipal()).getUser().getUserId();
        userService.removeUser(userId);

        return ResponseEntity.ok(
                new SuccessResponse<>("유저 탈퇴 성공", userId)
        );
    }

    @PatchMapping("/password")
    public ResponseEntity<SuccessResponse<Long>> changeUserPassword(Authentication authentication, @Valid @RequestBody UserPasswordUpdateRequest userPasswordUpdateRequest) {
        User user = ((CustomUserDetail) authentication.getPrincipal()).getUser();
        String oldPassword = userPasswordUpdateRequest.getOldPassword();
        String newPassword = userPasswordUpdateRequest.getNewPassword();
        userService.changeUserPassword(user, oldPassword, newPassword);

        return ResponseEntity.ok(
                new SuccessResponse<>("유저 비밀번호 변경 성공", user.getUserId())
        );
    }

    @PatchMapping
    public ResponseEntity<SuccessResponse<Long>> changeUserInfo(Authentication authentication, @Valid @RequestBody UserUpdateRequest userUpdateRequest) {
        User user = ((CustomUserDetail) authentication.getPrincipal()).getUser();
        userService.updateUser(user.getUserId(), userUpdateRequest);

        return ResponseEntity.ok(
                new SuccessResponse<>("유저 정보 변경 성공", user.getUserId())
        );
    }

}