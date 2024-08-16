import cv2
import time
import speaker
import bellSound
import os

def capture_image():
    # 비디오 캡처 객체 생성 (기본 카메라 사용)
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("카메라를 열 수 없습니다.")
        return

    # 카메라 안정화를 위한 시간
    time.sleep(3)  # 카메라가 안정화되도록 2초간 대기

    speaker.text_to_speech("셋")
    time.sleep(0.3)
    speaker.text_to_speech("둘")
    time.sleep(0.3)
    speaker.text_to_speech("하나")
    time.sleep(0.3)

    # 카메라 안정화 확인을 위한 몇 개의 프레임을 읽기
    for i in range(10):
        ret, frame = cap.read()
        if not ret:
            print("프레임을 읽을 수 없습니다.")
            return

    bellSound.play_shutterSound()

    # 최종 프레임 읽기
    ret, frame = cap.read()

    if ret:
        # 프레임을 시계방향으로 90도 회전
        rotated_frame = cv2.rotate(frame, cv2.ROTATE_90_CLOCKWISE)

        # 프레임 저장
        filename = 'captured_image.jpg'
        cv2.imwrite(filename, rotated_frame)
        print(f"{filename} 저장되었습니다.")

        filename = '/home/orin/S11P12B201/iot/features/captured_image.jpg'
        cv2.imwrite(filename, rotated_frame)
        print(f"{filename} 저장되었습니다.")

        filename = '/home/orin/S11P12B201/iot/features/sensors/captured_image.jpg'
        cv2.imwrite(filename, rotated_frame)
        print(f"{filename} 저장되었습니다.")

        # 추가 경로에 프레임 저장
        additional_path = '/home/orin/ai/S11P12B201/clothing-classification/data/test/images'
        additional_filename = os.path.join(additional_path, 'captured_image.jpg')

        # 파일이 이미 존재하면 삭제
        if os.path.exists(additional_filename):
            os.remove(additional_filename)
            print(f"기존의 {additional_filename} 파일이 삭제되었습니다.")

        cv2.imwrite(additional_filename, rotated_frame)
        print(f"{additional_filename} 저장되었습니다.")
    else:
        print("프레임을 읽을 수 없습니다.")

    # 캡처 객체 해제
    cap.release()

if __name__ == "__main__":
    capture_image()

