import time
import sys
sys.path.append('/home/orin/S11P12B201/iot/features/sensors/')
from microphone import recognize_speech_from_mic
sys.path.append('/home/orin/S11P12B201/iot/features/sensors/')
from speaker import text_to_speech
sys.path.append('/home/orin/S11P12B201/iot/features/sensors/')
from nfc import read_nfc
from adafruit_pn532.i2c import PN532_I2C
import busio
import board
sys.path.append('/home/orin/S11P12B201/iot/database/')
from mySqlConnection import read_db_config, MySQLDatabase
from infrared_sensor import check_infrared_sensor, get_all_not_active_sensor
from RPi import GPIO
from pyMySqlConnection import execute_query

def registClothes(pn532):
    voice="촬영용 거치대에 옷을 걸어주세요."
    text_to_speech(voice)
    print(voice)

    # clothesInfo=getColothesInfo()
    # if(clothesInfo!=None):
    clothesName="빨간색 셔츠"
    voice=clothesName+"가 등록되었습니다. NFC 태깅을 통해 옷을 등록해주세요."
    text_to_speech(voice)
    print(voice)

    uid=read_nfc(pn532)

    if(uid==None):
        voice="NFC 센서 태깅에 실패했습니다."
        text_to_speech(voice)
        return

    print(uid)

    insert_query = "INSERT INTO clothes (nickname, color, location, nfc_id) VALUES ('파란색 바지','파란색', 'C-1', '2')"
    #db.execute_query(insert_query, ("파란 무지 반팦티", "파란색","B-1"))
    execute_query(insert_query);

    voice = "옷이 정상적으로 등록되었습니다. 옷장에 걸어주세요."
    text_to_speech(voice)

    for i in 10:
        check_infrared_sensor(4)
        time.sleep(1)

    # else:


if __name__ == "__main__":
    i2c = busio.I2C(board.SCL, board.SDA)
    pn532 = PN532_I2C(i2c, debug=False)
    ic, ver, rev, support = pn532.firmware_version
    pn532.SAM_configuration()

    # DB 연결
    config = read_db_config()
    db = MySQLDatabase(config)
    db.connect()

    # GPIO 연결
    #GPIO.setmode(GPIO.BCM)
    #sensor=4
    #GPIO.setup(sensor, GPIO.IN)

    # NFC 리더기 연결
    registClothes(pn532)

    db.disconnect()
