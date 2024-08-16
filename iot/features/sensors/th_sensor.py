import Adafruit_DHT

# DHT 센서 유형을 설정합니다. DHT11 또는 DHT22
sensor = Adafruit_DHT.DHT11  # 또는 DHT22

# 센서가 연결된 GPIO 핀 번호를 설정합니다.
pin =  21# GPIO 4번 핀에 연결된 경우


def read_value():
# 온도와 습도를 읽어옵니다.
    humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)

# 읽어온 값이 유효한지 확인합니다.
    if humidity is not None and temperature is not None:
        print(f'Temperature: {temperature:.1f}°C')
        print(f'Humidity: {humidity:.1f}%')
    else:
        print('Failed to get reading. Try again!')

read_value()
