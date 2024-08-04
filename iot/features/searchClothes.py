import sys
sys.path.append('/home/orin/S11P12B201/iot/features/sensors/')
from microphone import recognize_speech_from_mic
sys.path.append('/home/orin/S11P12B201/iot/features/sensors/')
from speaker import text_to_speech

def searchClothes():
    while True:
        words = recognize_speech_from_mic()
        if(words is None):
            voice="띠링"
            text_to_speech(voice)
            return

        text = wordsToText(words)
        if(text=="옷 찾아 줘"):
            voice="어떤 옷을 찾아 드릴까요?"
            text_to_speech(voice)
            words = recognize_speech_from_mic()
            text=wordsToText(words)
            voice=text+"는 A-3 에 위치해 있습니다."
            text_to_speech(voice)

            break
        else:
            voice="다시 말씀해 주세요"
            text_to_speech(voice)


def wordsToText(words):
    return ' '.join(words)

if __name__ == "__main__":
    searchClothes()
