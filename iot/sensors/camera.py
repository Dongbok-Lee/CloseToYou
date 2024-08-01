import cv2

def open_camera():
    # 비디오 캡처 객체 생성 (기본 카메라 사용)
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("카메라를 열 수 없습니다.")
        return

    while True:
        # 프레임 읽기
        ret, frame = cap.read()

        if not ret:
            print("프레임을 읽을 수 없습니다.")
            break

        # 프레임을 윈도우에 표시
        cv2.imshow('Camera', frame)

        # 키 입력 대기
        key = cv2.waitKey(1)

        if key & 0xFF == ord('q'):
            # 'q' 키를 누르면 루프 탈출
            break
        elif key & 0xFF == ord('s'):
            # 's' 키를 누르면 사진 촬영 및 저장
            filename = 'captured_image.jpg'
            cv2.imwrite(filename, frame)
            print(f"{filename} 저장되었습니다.")

    # 캡처 객체와 모든 윈도우 해제
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    open_camera()
