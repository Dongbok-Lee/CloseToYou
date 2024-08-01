from sensors import speaker, nfc, infrared_sensor;


def put_clothes(infrared_sensor_list):
    speaker.text_to_speech("옷을 등록하기 위해서 NFC를 태깅해 주세요")
    nfc_serial_id = nfc.read_nfc()

    if nfc_serial_id == None :
        speaker.text_to_speech("옷 등록에 실패하였습니다. 초기 상태로 돌아갑니다.")
        return
    
    # 옷 정보 가져옴
    clothes_info = {
        "nickname" : "파랑 셔츠",
        "color" : "파랑",
        "type" : "셔츠"
    }

    speaker.text_to_speech("옷이 정상적으로 등록이 되었습니다. 옷을 옷장에 걸어주세요.")
    
    current_status = infrared_sensor.get_all_not_active_sensor(infrared_sensor_list)

    for i in current_status:
        if infrared_sensor.check_infrared_sensor(i) == 1 :
            # DB에 옷 정보 저장하기

            speaker.text_to_speech("파란색 셔츠가 정상적으로 걸렸습니다.")