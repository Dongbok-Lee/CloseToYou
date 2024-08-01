package ssafy.closetoyou.clothes.controller.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ClothesResponse {
    private Long clothesId;
    private String nickname;
    private String type;
    private String pattern;
    private String color;
    private String size;
    private String weather;
    private String memo;
    private String wearingCount;
    private String location;
    private Boolean deleted;
    private LocalDateTime registTime;
    private LocalDateTime updateTime;
    private LocalDateTime lastWornDate;
}
