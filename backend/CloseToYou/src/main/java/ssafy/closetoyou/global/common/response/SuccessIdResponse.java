package ssafy.closetoyou.global.common.response;

import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
public class SuccessIdResponse {
    private final String message;
    private final Map<String, Long> data = new HashMap<>();

    public SuccessIdResponse(String message, Long id) {
        this.message = message;
        this.data.put("id", id);
    }
}
