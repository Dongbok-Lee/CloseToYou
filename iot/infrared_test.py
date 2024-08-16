import time
import board
import digitalio


sensor1 = digitalio.DigitalInOut(board.D18)
sensor2 = digitalio.DigitalInOut(board.D24)
sensor3 = digitalio.DigitalInOut(board.D23)
sensor4 = digitalio.DigitalInOut(board.D4)
sensor5 = digitalio.DigitalInOut(board.D17)
sensor6 = digitalio.DigitalInOut(board.D22)
sensor1.direction = digitalio.Direction.INPUT
sensor2.direction = digitalio.Direction.INPUT
sensor3.direction = digitalio.Direction.INPUT
sensor4.direction = digitalio.Direction.INPUT
sensor5.direction = digitalio.Direction.INPUT
sensor6.direction = digitalio.Direction.INPUT


def get_all_value():
    return [sensor1.value, sensor2.value, sensor3.value, sensor4.value, sensor5.value, sensor6.value]


def test_all_value():
    while True:

        time.sleep(0.6)

        sensors = get_all_value()
        print(sensors)
        for i in range(0, 6):
            if sensors[i] is True:
                print("")


while True:
    time.sleep(1)
    test_all_value()
