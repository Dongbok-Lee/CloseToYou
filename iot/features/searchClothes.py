import sys
sys.path.append('/home/orin/S11P12B201/iot/features/sensors/')
from microphone import recognize_speech_from_mic
sys.path.append('/home/orin/S11P12B201/iot/features/sensors/')
from speaker import text_to_speech
sys.path.append('/home/orin/S11P12B201/iot/request/')
from AISearchClothes import request_find_clothes
sys.path.append('/home/orin/S11P12B201/iot/database')
from pyMySqlConnection import execute_query


def search():
    while True:
        text = recognize_speech_from_mic()
        print(text)
        if(text is None):
            voice="띠링"
            text_to_speech(voice)
            return

        keyword = extract_keyword(text)

        if(keyword is not None):
            print(keyword)           
            data = execute_query("select * from clothes")
            voice = request_find_clothes( list_to_string(data) + keyword + "의 위치를 출력해줘")
            print(voice)
            text_to_speech(voice)

            break
        else:
            voice="다시 말씀해 주세요"
            text_to_speech(voice)


def wordsToText(words):
    return ' '.join(words)

def extract_keyword(text):
    # "찾아"가 문자열에 있는지 확인
    search_phrase = "찾아"
    if search_phrase in text:
        # "찾아"의 위치를 찾아 앞의 문자열 추출
        index = text.find(search_phrase)
        return text[:index].strip()
    else:
        return None

def list_to_string(lst, delimiter=' '):
    """
    주어진 리스트를 구분자로 연결하여 문자열로 변환하는 함수.

    Parameters:
    lst (list): 문자열이나 숫자로 구성된 리스트
    delimiter (str): 리스트 요소를 구분할 구분자 (기본값은 공백)

    Returns:
    str: 리스트 요소를 구분자로 연결한 문자열
    """
    return delimiter.join(map(str, lst))

# data = "[{'clothes_id': 1, 'nickname': '빨간 티셔츠', 'type': '티셔츠', 'location': 'a4', 'pattern': '>없음', 'color': '빨강'}, {'clothes_id': 2, 'nickname': '이쁜이', 'type': '코트', 'location': 'a3', 'pattern': '없음', 'color': '파랑'}, {'clothes_id': 3, 'nickname': '노랑 티셔츠', 'type': '티셔츠', 'location': 'a2', 'pattern': '없음', 'color': '노랑'}, {'clothes_id': 4, 'nickname': '이동복', 'type': '바지', 'location': 'a2', 'pattern': '없음', 'color': '하양'}] 상의의 위치만 단독으로 출력해줘"


