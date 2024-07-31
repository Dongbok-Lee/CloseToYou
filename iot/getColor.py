import cv2
import numpy as np

def get_color_properties(image_path, roi_coords):
    # 이미지 읽기
    image = cv2.imread(image_path)
    
    # 이미지가 제대로 읽혔는지 확인
    if image is None:
        print("Error: Could not read image.")
        return

    # ROI (Region of Interest) 설정
    x, y, w, h = roi_coords
    roi = image[y:y+h, x:x+w]

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
    
    # 채도(색의 강도 또는 순도/ 0:밋밋, 255:강렬)
    avg_saturation = avg_hsv[1]

    # 명도(색의 밝기 0:어두움, 255:밝음)
    avg_value = avg_hsv[2]

    # 결과 출력
    print("Average RGB Color:", avg_color_rgb)
    print("Average Hue:", avg_hue)
    print("Average Saturation:", avg_saturation)
    print("Average Value (Brightness):", avg_value)

    # 원본 이미지와 ROI를 화면에 표시
    cv2.imshow("Original Image", image)
    cv2.imshow("Region of Interest", roi)

    # 키 입력 대기 및 창 닫기
    cv2.waitKey(0)
    cv2.destroyAllWindows()

if __name__ == "__main__":
    # 이미지 경로 설정
    image_path = "./blue.png"

    # ROI 좌표 설정 (x, y, width, height)
    roi_coords = (50, 50, 200, 200)  # 예시 좌표, 이미지에 맞게 조절

    # 색상 속성 추출 함수 호출
    get_color_properties(image_path, roi_coords)

