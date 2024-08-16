import sys
import os
sys.path.append('/home/orin/S11P12B201/iot/features/sensors')
from bellSound import play_bellSound, play_failSound
import speech_recognition as sr
import time

# 음성 인식 객체 생성
recognizer = sr.Recognizer()

# duration : 마이크 감도 조절, 높을 수록 더 정확한 소리를 검출함. 단 좀 더 느려질 수 있음
# timeout : 입력한 시간 내에 음성이 안 들어오면 예외
# phrase_time_limit : 마이크에 입력이 들어오기 시작하고 n초 동안만 감지함

def recognize_speech_from_mic():
    with sr.Microphone() as source:
        print("Adjusting for ambient noise, please wait...")
        recognizer.adjust_for_ambient_noise(source, duration=0.5) 
#        recognizer.adjust_for_ambient_noise(source, duration=1)  # 줄인 시간

        print("Listening...")
        recognizer.pause_threshold = 0.5

        while True:
            try:
                audio = recognizer.listen(source)
                #audio = recognizer.listen(source, timeout=5, phrase_time_limit=3)  # 추가 파라미터
                print("Recognizing...")

                text = recognizer.recognize_google(audio, language="ko-KR")
                play_bellSound()
                print(f"Recognized: {text}")

                words = text.split()
                print(words)
                return text

            except sr.WaitTimeoutError:
                play_failSound()
                print("마이크를 종료합니다.")
                break  # 종료 조건 추가
            except sr.UnknownValueError:
                print("Google Speech Recognition could not understand audio")
            except Exception as e:
                play_failSound()
                print(f"An error occurred: {e}")


def listen_for_keywords():
    recognizer = sr.Recognizer()
    microphone = sr.Microphone()
    keywords = ["클로젯"]
#   keywords = ["클","츄","플루트","플루투","블루투스","클로츠", "클로즈", "클로츄", "클로 추", "클로 2", "플로트", "불로초", "그렇죠", "그렇지", "클러치", "트로트", "클럽 춤", "그루트"]

    while True:
        with microphone as source:
            print("Listening...")
            recognizer.pause_threshold = 0.5

            recognizer.adjust_for_ambient_noise(source, duration=0.5)
            #recognizer.adjust_for_ambient_noise(source, duration=0.5)  # 줄인 시간
            
            audio = recognizer.listen(source)
            #audio = recognizer.listen(source, phrase_time_limit=3)  # 추가 파라미터

        try:
            speech_text = recognizer.recognize_google(audio, language="ko-KR")
            play_bellSound()
            print(f"Recognized: {speech_text}")

            for keyword in keywords:
                if keyword in speech_text:
                    return "안녕하세요! 무엇을 도와드릴까요?"

        except sr.UnknownValueError:
            print("Could not understand audio")
        except sr.RequestError as e:
            play_failSound()
            print(f"Could not request results; {e}")


def listen_for_shoot_picture():
    recognizer = sr.Recognizer()
    microphone = sr.Microphone()

    keywords = ["촬영"]

    with microphone as source:
        print("Listening...")
        recognizer.pause_threshold = 0.5

        recognizer.adjust_for_ambient_noise(source, duration=0.5)
        #recognizer.adjust_for_ambient_noise(source, duration=0.5)
        try:
            audio = recognizer.listen(source)
            #audio = recognizer.listen(source, timeout=10, phrase_time_limit=3)
        except sr.WaitTimeoutError:
            print("시간 초과")
            play_failSound()
            return "시간 초과"
        except Exception as e:
            print(f"An error occurred during listening: {e}")
            play_failSound()
            return "Listening error"

    try:
        speech_text = recognizer.recognize_google(audio, language="ko-KR")
        play_bellSound()
        print(f"Recognized: {speech_text}")

        for keyword in keywords:
            if keyword in speech_text:
                return "촬영"

    except sr.UnknownValueError:
        print("Could not understand audio")
        return "Could not understand audio"
    except sr.RequestError as e:
        play_failSound()
        return f"Request error: {e}"


# 사용 예시
#if __name__ == "__main__":
#    try:
#        recognize_speech_from_mic()
#        listen_for_shoot_picture()
#    except KeyboardInterrupt:
#        print("Program terminated by user")
#    except Exception as e:
#        print(f"An unexpected error occurred: {e}")
