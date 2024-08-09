import sys
import time
from features.sensors import speaker, nfc, infrared_sensor
sys.path.append('/home/orin/S11P12B201/iot/database')
from pyMySqlConnection import execute_query
import Jetson.GPIO as GPIO

def put_clothes():
    speaker.text_to_speech("옷을 등록하기 위해서 NFC를 태깅해 주세요")
    nfc_serial_id = nfc.read_nfc()

    if nfc_serial_id == None :
        speaker.text_to_speech("옷 등록에 실패하였습니다. 초기 상태로 돌아갑니다.")
        return
    
    # 쿼리로 옷 정보 가져오기(옷장 = 옷장 시리얼 넘버, 사용여부 true, nfc_id로 검색)

    # excute_query('SELECT * FROM clothes WHERE clothes_id = 1')
    
    # 옷 정보 가져옴
    clothes_info = {
        "clothes_id": 3,
        "nickname" : "파랑 셔츠",
        "color" : "파랑",
        "type" : "셔츠"
    }

    # 옷 정보가 없는 경우
    if(clothes_info == None):
        speaker.text_to_speech("해당되는 옷 정보가 없습니다. 다시 시도해 주세요.")

    speaker.text_to_speech("옷이 정상적으로 등록이 되었습니다. 옷을 옷장에 걸어주세요.")
    
    inactive_status = infrared_sensor.get_inactive_value()
    count = [0, 0, 0, 0, 0]

    for j in range(0, 30):

        for i in inactive_status:
            
            if infrared_sensor.get_value(i) == False :
                count[i] += 1

                if count[i] == 6 :
                    # DB에 옷 정보 저장하기

                    speaker.text_to_speech(clothes_info.get("nickname") + "가" + str(i) + "번 위치에 정상적으로 걸렸습니다.")

                    return
        
        time.sleep(0.5)

    speaker.text_to_speech("옷이 걸리지 않았습니다. 초기상태로 돌아갑니다.")
    return



