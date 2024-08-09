import RPi.GPIO as GPIO
import time

DHT_PIN = 4  # 변경 필요, DHT 데이터 핀에 연결된 GPIO 핀 번호

GPIO.setmode(GPIO.BCM)
GPIO.setup(DHT_PIN, GPIO.IN)

def read_dht11():
    data = []
    GPIO.setup(DHT_PIN, GPIO.OUT)
    GPIO.output(DHT_PIN, GPIO.LOW)
    time.sleep(0.02)
    GPIO.output(DHT_PIN, GPIO.HIGH)
    GPIO.setup(DHT_PIN, GPIO.IN)

    for i in range(0, 500):
        data.append(GPIO.input(DHT_PIN))

    bit_count = 0
    tmp = 0
    count = 0
    humidity_bit = ""
    temperature_bit = ""
    crc = ""

    try:
        while data[count] == 1:
            tmp = 1
            count = count + 1

        for i in range(0, 32):
            bit_count = 0

            while data[count] == 0:
                tmp = 1
                count = count + 1

            while data[count] == 1:
                bit_count = bit_count + 1
                count = count + 1

            if bit_count > 3:
                if i >= 0 and i < 8:
                    humidity_bit = humidity_bit + "1"
                if i >= 16 and i < 24:
                    temperature_bit = temperature_bit + "1"
            else:
                if i >= 0 and i < 8:
                    humidity_bit = humidity_bit + "0"
                if i >= 16 and i < 24:
                    temperature_bit = temperature_bit + "0"

    except:
        return False

    try:
        humidity = int(humidity_bit, 2)
        temperature = int(temperature_bit, 2)
        return humidity, temperature
    except:
        return False

if __name__ == "__main__":
    while True:
        result = read_dht11()
        if result:
            humidity, temperature = result
            print(f"Temperature: {temperature}C, Humidity: {humidity}%")
        else:
            print("Failed to read from DHT11 sensor")

