from features.sensors import nfc, microphone, speaker, infrared_sensor
from features import searchClothes, putClothes, registClothes
from pyMySqlConnection import execute_query
import speech_recognition as sr
import threading
import time


def run():
    print("start")
    nfc_read_thread = threading.Thread(target=read_clothes_info)
    nfc_read_thread.start()
    infrared_read_thread = threading.Thread(target=check_infrared_sensor)
    infrared_read_thread.start()


    speaker.text_to_speech(microphone.listen_for_keywords()) 
    mode[0] = 2

    closet_info = execute_query('select * from closets where closet_code = "A1B2C3"')

    if closet_info == ():
        speaker.text_to_speech("등록되지 않은 옷장입니다.")
        mode[0] = 1
        return
    
    command = microphone.recognize_speech_from_mic()

    find_clothes(command)
    put_clothes(command)
    regist_clothes(command)
    mode[0] = 1

def regist_clothes(command):

    regist_keywords = ["등록"]

    for i in regist_keywords:
        if i in command:
            registClothes.registClothes()



def find_clothes(command):
    
    find_keywords = ["찾기", "찾아"]
    
    for i in find_keywords:
        if i in command:
            speaker.text_to_speech("어떤 옷을 찾으시나요?")
            searchClothes.search()


def put_clothes(command):
    put_keywords = ["걸기" , "걸어"]
    
    for i in put_keywords:
        if i in command:
            speaker.text_to_speech("옷을 옷장에 걸겠습니다.")
            putClothes.put_clothes()

def read_clothes_info():
    while True:
        time.sleep(0.5)
        if mode[0] == 1:
            nfc_id = nfc.read_nfc_by_mode(mode)
            result = execute_query("select * from clothes where nfc_id =" + nfc_id)

            if result == ():
                speaker.text_to_speech("등록되지 않은 엔에프씨  태그 입니다.")
                continue
            print(result[0].get("nickname"), result[0].get("location"))
            speaker.text_to_speech(result[0].get("nickname"))
        else:
            return


def check_infrared_sensor():
    time.sleep(1)
    previous_status = infrared_sensor.get_all_value()

    while True:
        time.sleep(0.5)
        if mode[0] is 1:
            current_status = infrared_sensor.get_all_value()
            compare_status(previous_status, current_status)
            previous_status = current_status
        else:
            return

def compare_status(previous, current):
    location_info = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3']
    for i in range(0, len(previous)):
        if previous[i] is False and current[i] is True:
            print(location_info[i], "위치의 옷을 가져갔습니다")
            data = execute_query("select clothes_id, location, c.nickname from clothes c, closets c2 where c.closet_id = c2.closet_id and closet_code = 'A1B2C3' and location ='" + location_info[i] + "'")
            
            print(data)

            if data == ():
                speaker.text_to_speech("서버에 등록 되지 않은 옷입니다. 다시 걸어주세요.")
            else:
                speaker.text_to_speech("위치 " + data[0].get("location") + " 닉네임 " + data[0].get("nickname"))
                clothes_check_thread = threading.Thread(target=check_bring_clothes, args=(i, data[0].get("clothes_id")))
                clothes_check_thread.start()
        elif previous[i] is True and current[i] is False:

            data = execute_query("select clothes_id, location, c.nickname from clothes c, closets c2 where c.closet_id = c2.closet_id and closet_code = 'A1B2C3' and location ='" + location_info[i] + "'")

            if data == ():
                while infrared_sensor.get_value(i) is False:
                    speaker.text_to_speech("엔에프씨 태그  후에 옷을 걸어주세요")
                    time.sleep(2)
                current[i] = True



def check_bring_clothes(location, clothes_id):
    for i in range(0, 10):
        time.sleep(1)
        print(10-i, "초후 외출 완료")
        if infrared_sensor.get_value(location) is False:
            print("복귀")
            return
    print("clothes_id = " ,clothes_id, " 외출 완료")
    execute_query("update clothes set location = null, wearing_count = wearing_count + 1, last_worn_date = now() where clothes_id = "+ str(clothes_id))


if __name__ == "__main__":
    mode = [1]
    while True:
        run()
