import cv2
import numpy as np

def get_color_name(avg_hue, avg_saturation, avg_value):
    if avg_value < 20:
        return ["검정색", "BLACK"]
    if avg_saturation < 20:
        if avg_value < 200:
            return ["회색", "GRAY"]
        else:
            return ["흰색", "WHITE"]
    if avg_hue < 10 or avg_hue >= 350:
        return ["빨간색", "RED"]
    elif 10 <= avg_hue < 20:
        return ["주황색", "ORANGE"]
    elif 20 <= avg_hue < 40:
        return ["노란색", "YELLOW"]
    elif 40 <= avg_hue < 80:
        return ["초록색", "GREEN"]
    elif 80 <= avg_hue < 130:
        return ["파란색", "BLUE"]
    elif 130 <= avg_hue < 170:
        return ["남색", "NAVY"]
    elif 170 <= avg_hue < 260:
        return ["보라색", "PURPLE"]
    elif 260 <= avg_hue < 320:
        return ["분홍색", "PINK"]
    elif 320 <= avg_hue < 350:
        return ["갈색", "BROWN"]
    elif 20 <= avg_hue < 40 and avg_value > 200:
        return ["베이지색", "BEIGE"]
    else:
        return ["알 수 없는 색상", "UNKNOWN"]

def get_color_properties(image_path):
    # 이미지 읽기
    print(image_path)
    image = cv2.imread(image_path)

    # 이미지가 제대로 읽혔는지 확인
    if image is None:
        print("Error: Could not read image.")
        return None

    # 이미지 크기 가져오기
    h, w, _ = image.shape

    # 이미지의 가운데 30% 영역 계산
    start_x = int(w * 0.35)
    end_x = int(w * 0.65)
    start_y = int(h * 0.35)
    end_y = int(h * 0.65)

    # 가운데 30% 영역 설정
    roi = image[start_y:end_y, start_x:end_x]

    # ROI 크기 조정 (옵션, 필요에 따라)
    roi = cv2.resize(roi, (100, 100))

    # RGB 색상 계산
    avg_color_per_row = np.average(roi, axis=0)
    avg_color = np.average(avg_color_per_row, axis=0)

    # RGB 데이터
    avg_color_rgb = [int(avg_color[2]), int(avg_color[1]), int(avg_color[0])]

    # BGR 이미지를 HSV 이미지로 변환
    hsv_roi = cv2.cvtColor(roi, cv2.COLOR_BGR2HSV)

    # HSV 색상 계산
    avg_hsv_per_row = np.average(hsv_roi, axis=0)
    avg_hsv = np.average(avg_hsv_per_row, axis=0)
    avg_hue = avg_hsv[0]
    avg_saturation = avg_hsv[1]
    avg_value = avg_hsv[2]

    # 결과 배열로 반환
    color_properties = {
        "avg_color_rgb": avg_color_rgb,
        "avg_hue": avg_hue,
        "avg_saturation": avg_saturation,
        "avg_value": avg_value
    }

    # 색상 이름 반환
    color_name = get_color_name(avg_hue, avg_saturation, avg_value)

    return color_properties, color_name

#if __name__ == "__main__":
#    # 이미지 경로 설정
#    image_path = "../captured_image.jpg"
#
#    # ROI 좌표 설정 (x, y, width, height)
#    roi_coords = (50, 50, 200, 200)  # 예시 좌표, 이미지에 맞게 조절
#
#    # 색상 속성 추출 함수 호출 및 결과 배열 반환
#    color_properties, color_name = get_color_properties(image_path)
#    if color_properties:
#        print("Color Properties Array:", color_properties)
#        print("Detected Color Name:", color_name)
