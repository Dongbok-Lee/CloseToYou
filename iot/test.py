from features.sensors import nfc
from database.pyMySqlConnection import execute_query
from features.sensors import speaker

def read_clothes_info():
    nfc_id = nfc.read_nfc()
    result = execute_query("select * from clothes where nfc_id =" + nfc_id)

    if result == ():
        speaker.text_to_speech("등록되지 않은 엔에프씨  태그 입니다.")
        return
    print(result[0].get("nickname"), result[0].get("location"))
    speaker.text_to_speech(result[0].get("nickname"))

read_clothes_info()
