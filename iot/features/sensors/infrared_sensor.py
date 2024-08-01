from RPi import GPIO


def set_infrared_sensor(pin_number):
	GPIO.setmode(GPIO.BCM)

	sensor = pin_number

	GPIO.setup(sensor, GPIO.IN)


def check_infrared_sensor(pin_number):
	return GPIO.input(pin_number)


def get_all_not_active_sensor(pin_numbers):
	
	infrared_sensor = []
	for i in pin_numbers:
		if GPIO.input(i) == 0:
			infrared_sensor.append(i)

	return infrared_sensor
