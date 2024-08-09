from features.sensors import microphone, speaker
from features import searchClothes, putClothes
import speech_recognition as sr
import time

def ai_mode():
    speaker.text_to_speech(microphone.listen_for_keywords())
    command = microphone.recognize_speech_from_mic()
    register_keywords = ["등록"]
    put_keywords = ["걸기, 걸어"]

    find_clothes(command)

    put_clothes(command)

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

if __name__ == "__main__":
#    listening = recognizer.listen_in_background(mic, listen)
#    while True:
#        time.sleep(0.1)
    ai_mode()
