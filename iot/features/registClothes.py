import time
import sys
sys.path.append('/home/orin/S11P12B201/iot/features/sensors/')
from microphone import recognize_speech_from_mic
sys.path.append('/home/orin/S11P12B201/iot/features/sensors/')
import speaker
sys.path.append('/home/orin/S11P12B201/iot/features/sensors/')
from nfc import read_nfc
import shootPicture
import getColorName
import isSolidColor
import sys
import nfc
import infrared_sensor
import bellSound
sys.path.append('/home/orin/S11P12B201/iot/features/sensors')
from microphone import recognize_speech_from_mic
from adafruit_pn532.i2c import PN532_I2C
import busio
import board
sys.path.append('/home/orin/S11P12B201/iot/database/')
from mySqlConnection import read_db_config, MySQLDatabase
#from infrared_sensor import check_infrared_sensor, get_all_not_active_sensor
#from RPi import GPIO
from pyMySqlConnection import execute_query
sys.path.append('/home/orin/S11P12B201/iot/features')
import sendImageToS3
sys.path.append('/home/orin/ai/S11P12B201/clothing-classification')
import jetson_nano_test
import threading 
import ctypes 
   
class thread_with_exception(threading.Thread): 
    def __init__(self, name): 
        threading.Thread.__init__(self) 
        self.name = name 
        self._stop_event = threading.Event()
              
    def run(self):
        # target function of the thread class
        try:
            self.check_stop()
            bellSound.play_bgmSound_1()
            self.check_stop()
            bellSound.play_bgmSound_2()
            self.check_stop()
            bellSound.play_bgmSound_3()
            self.check_stop()
            bellSound.play_bgmSound_4()
            self.check_stop()
            bellSound.play_bgmSound_5()
            self.check_stop()
            bellSound.play_bgmSound_6()
            self.check_stop()
            bellSound.play_bgmSound_7()
            self.check_stop()
            bellSound.play_bgmSound_8()
            self.check_stop()
            bellSound.play_bgmSound_9()
            self.check_stop()
            bellSound.play_bgmSound_10()
            self.check_stop()
            bellSound.play_bgmSound_11()
            print('running ' + self.name)
        finally:
            print('ended')

    def check_stop(self):
        if self._stop_event.is_set():
            raise SystemExit()

    def get_id(self): 
  
        # returns id of the respective thread 
        if hasattr(self, '_thread_id'): 
            return self._thread_id 
        for id, thread in threading._active.items(): 
            if thread is self: 
                return id
   
    def raise_exception(self):
        self._stop_event.set()
        thread_id = self.get_id() 
        res = ctypes.pythonapi.PyThreadState_SetAsyncExc(thread_id, 
              ctypes.py_object(SystemExit)) 
        if res > 1: 
            ctypes.pythonapi.PyThreadState_SetAsyncExc(thread_id, 0) 
            print('Exception raise failure') 
       
location_info = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3']

clothes_translations = {
        "블라우스" : "BLOUSE",
        "가디건" : "CARDIGAN",
        "코트":"COAT", 
        "재": "JACKET", 
        "점퍼": "JUMPER",
        "셔츠": "SHIRT", 
        "스웨터": "SWEATER",
        "티셔츠": "TSHIRT", 
        "조끼": "VEST", 
        "바지": "PANTS",
        "치마": "SKIRT", 
        "드래스": "DRESS", 
        "점프수트": "JUMPSUIT"
}

pattern_translations = {
        "체크":"CHECK",
        "도트":"DOT",
        "스트라이프":"STRIPE",
        "꽃무늬":"PLANTS",
        "무지":"BLANK",
        "기타":"ETC"
}


def registClothes():

    speaker.text_to_speech("촬영용 거치대에 옷을 걸어주세요. 준비가 완료되면 촬영 이라고 말씀해주세요.")

    while True:
        text = recognize_speech_from_mic()
        print(text)

        if(text == "촬영"):
            break
        if(text is None):
            return

    shootPicture.capture_image()
    speaker.text_to_speech("옷 정보를 분석하고 있습니다. 잠시만 기다려주세요.")


    # ROI 좌표 설정 (x, y, width, height)
    image_path = "/home/orin/S11P12B201/iot/features/captured_image.jpg"
    color_properties, color_name = getColorName.get_color_properties(image_path)

    pattern = ""
    if isSolidColor.is_solid_color(image_path):
        pattern = "무지"

    # color_name 리스트를 문자열로 변환
    color_name_str = ", ".join(color_name)  # 요소를 쉼표로 구분하여 연결
    print(color_name)
    print(color_name[0])
    print(color_name[1])

    thread = thread_with_exception(name="BGM Thread")
    thread.start()

    clothes_type, temp_pattern = jetson_nano_test.run()
    print(f"옷 종류: {clothes_type}, 패턴: {temp_pattern}")

    thread.raise_exception()

    if clothes_type == None:
       return

    if pattern == "":
        pattern=temp_pattern
    
    # clothesInfo=getColothesInfo()
    # if(clothesInfo!=None):
    voice = pattern + color_name[0] + clothes_type + " 옷 정보 분석을 완료 했습니다."
    speaker.text_to_speech(voice)
    print(voice)

    speaker.text_to_speech("NFC 태깅을 통해 옷을 등록해주세요,")
    nfc_serial_id = nfc.read_nfc()

    if nfc_serial_id == None :
        speaker.text_to_speech("옷 등록에 실패했습니다. 초기 상태로 돌아갑니다.")
        return

    print(nfc_serial_id)

    sendImageToS3.upload_to_s3(image_path,'closetoyoubucket',nfc_serial_id)

    s3_image_url ="https://closetoyoubucket.s3.ap-northeast-2.amazonaws.com/"+nfc_serial_id
    print(s3_image_url)


    closet_id = execute_query("SELECT closet_id FROM closets WHERE closet_code = 'A1B2C3'")
    print(closet_id[0])
    insert_query = "INSERT INTO clothes (closet_id, created_date_time, type, nickname, color, pattern, wearing_count, image_url, nfc_id) VALUES (" + str(closet_id[0].get("closet_id")) + ", now(), '" + clothes_translations.get(clothes_type) + "','"+ color_name[0] + " " + clothes_type + "', '"+ color_name[1] + "', '"+ pattern_translations.get(pattern, "ETC") +"', 0, '"+ s3_image_url+"', "+ nfc_serial_id + ")"
    
    print(insert_query)
    #db.execute_query(insert_query, ("파란 무지 반팦티", "파란색","B-1"))
    execute_query(insert_query);
#    sendImageToS3.upload_to_s3(image_path,'closetoyoubucket',nfc_serial_id)

    speaker.text_to_speech("옷이 정상적으로 등록되었습니다. 옷을 옷장에 걸어주세요.")

    inactive_status = infrared_sensor.get_inactive_value()
    count = [0, 0, 0, 0, 0, 0]

    for j in range(0, 30):

        for i in inactive_status:

            if infrared_sensor.get_value(i) == False :
                count[i] += 1

                if count[i] == 6 :
                    # DB에 옷 정보 저장하기
                    execute_query("update clothes set location= '" + location_info[i] + "' where nfc_id=" + nfc_serial_id)
                    speaker.text_to_speech(clothes_type  + "가" + location_info[i] + "번 위치에 정상적으로 걸렸습니다.")
                    return

        time.sleep(0.5)

    speaker.text_to_speech("옷 등록 과정이 종료되었습니다.")
