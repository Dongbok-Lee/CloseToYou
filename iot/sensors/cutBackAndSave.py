import cv2
import numpy as np
import os

def remove_background(image_path, output_folder):
    # 이미지 읽기
    image = cv2.imread(image_path)
    
    # 이미지가 제대로 읽혔는지 확인
    if image is None:
        print("Error: Could not read image.")
        return

    # 이미지 크기 설정
    height, width = image.shape[:2]

    # 초기 마스크 생성
    mask = np.zeros(image.shape[:2], np.uint8)

    # GrabCut 알고리즘을 위한 임시 배열 생성
    bgdModel = np.zeros((1, 65), np.float64)
    fgdModel = np.zeros((1, 65), np.float64)

    # 사각형 ROI 설정 (이미지 중앙 부분)
    rect = (50, 50, width-100, height-100)

    # GrabCut 알고리즘 적용
    cv2.grabCut(image, mask, rect, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_RECT)

    # 마스크 변환
    mask2 = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')

    # 이미지와 마스크를 사용하여 배경 제거
    image_no_bg = image * mask2[:, :, np.newaxis]

    # 배경이 제거된 이미지 저장
    output_path = os.path.join(output_folder, 'image_without_background.png')
    cv2.imwrite(output_path, image_no_bg)
    print(f"Processed image saved at: {output_path}")

if __name__ == "__main__":
    # 이미지 경로 설정
    image_path = "path/to/your/image.jpg"
    
    # 결과 이미지를 저장할 폴더 설정 (홈 디렉토리 아래)
    home_directory = os.path.expanduser('~')
    output_folder = os.path.join(home_directory, "cutBackResult")

    # 출력 폴더가 존재하지 않으면 생성
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # 배경 제거 함수 호출
    remove_background(image_path, output_folder)

