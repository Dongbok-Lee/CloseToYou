import time
import board
import digitalio


sensor1 = digitalio.DigitalInOut(board.D4)
sensor2 = digitalio.DigitalInOut(board.D17)
sensor3 = digitalio.DigitalInOut(board.D18)
sensor4 = digitalio.DigitalInOut(board.D22)
sensor5 = digitalio.DigitalInOut(board.D23)
sensor1.direction = digitalio.Direction.INPUT
sensor2.direction = digitalio.Direction.INPUT
sensor3.direction = digitalio.Direction.INPUT
sensor4.direction = digitalio.Direction.INPUT
sensor5.direction = digitalio.Direction.INPUT


def get_all_value():
    return [sensor1.value, sensor2.value, sensor3.value, sensor4.value, sensor5.value]


def get_inactive_value():
    values = get_all_value()
    result = []
    for i in range(1, 6): 
        if values[i - 1]:
            result.append(i - 1)
    return result


def get_value(sensor_num):
    return get_all_value()[sensor_num]

