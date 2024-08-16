import cv2
import numpy as np

def is_solid_color(image_path, hue_threshold=10, saturation_threshold=50, value_threshold=50, edge_density_threshold=20):
    # 이미지를 읽어옵니다
    image = cv2.imread(image_path)
    if image is None:
        print("이미지를 불러올 수 없습니다.")
        return False

    # 이미지를 RGB로 변환합니다
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # 이미지의 중심 부분 추출 (중앙의 20% 영역)
    h, w, _ = image_rgb.shape
    start_x, end_x = int(w * 0.45), int(w * 0.55)
    start_y, end_y = int(h * 0.45), int(h * 0.55)
    cropped_image = image_rgb[start_y:end_y, start_x:end_x]

    # 이미지를 크기를 조정하여 속도 향상
    resized_image = cv2.resize(cropped_image, (100, 100))

    # 이미지를 HSV 색상 공간으로 변환합니다
    hsv_image = cv2.cvtColor(resized_image, cv2.COLOR_RGB2HSV)

    # 각 채널(H, S, V)의 평균값과 표준편차 계산
    h_channel, s_channel, v_channel = cv2.split(hsv_image)
    h_mean, h_std = cv2.meanStdDev(h_channel)
    s_mean, s_std = cv2.meanStdDev(s_channel)
    v_mean, v_std = cv2.meanStdDev(v_channel)

    # 색상이 단일 계열인지 확인 (표준편차가 낮으면 단일 계열로 판단)
    is_single_hue = h_std < hue_threshold
    is_single_saturation = s_std < saturation_threshold
    is_single_value = v_std < value_threshold

    # 텍스처 분석을 위한 그레이스케일 변환
    gray_image = cv2.cvtColor(resized_image, cv2.COLOR_RGB2GRAY)

    # Sobel 연산자를 사용하여 엣지 검출
    sobel_x = cv2.Sobel(gray_image, cv2.CV_64F, 1, 0, ksize=3)
    sobel_y = cv2.Sobel(gray_image, cv2.CV_64F, 0, 1, ksize=3)
    sobel_mag = np.sqrt(sobel_x**2 + sobel_y**2)

    # 엣지 강도의 평균값 계산
    edge_density = np.mean(sobel_mag)

    # 디버깅용 정보 출력
    print(f"Hue std: {h_std[0][0]}, Saturation std: {s_std[0][0]}, Value std: {v_std[0][0]}, Edge density: {edge_density}")

    # 색상 계열이 단일 계열이고 엣지 밀도가 낮으면 무지티로 판단
    is_solid_tshirt = is_single_hue and is_single_saturation and is_single_value and edge_density < edge_density_threshold

    return is_solid_tshirt

# 테스트할 이미지 경로
#image_path = "blue.png"

# 결과 출력
#if is_solid_color(image_path):
#    print("이미지가 무지색입니다.")
#else:
#    print("이미지가 무지색이 아닙니다.")

