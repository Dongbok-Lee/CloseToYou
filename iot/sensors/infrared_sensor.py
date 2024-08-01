from RPi import GPIO
from time import sleep

GPIO.setmode(GPIO.BCM)

sensor = 11


GPIO.setup(sensor, GPIO.IN)


try:
	while True:
		if not GPIO.input(sensor):
			print("on")
		else:
			print("off")
		sleep(0.2)
except:
	GPIO.cleanup()