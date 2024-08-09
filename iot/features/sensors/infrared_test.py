import time
from infrared_sensor import get_value

# 사용 예시
if __name__ == "__main__":
    try:
        while True:  # 수정: true -> True (Python의 경우 True는 대문자로 시작)
            print(get_value(0))
            time.sleep(1)  # 센서 값을 일정 주기로 출력하기 위해 추가된 코드
    except KeyboardInterrupt:
        print("Program terminated by user")
