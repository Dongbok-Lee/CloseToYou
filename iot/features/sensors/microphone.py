import speech_recognition as sr

# 음성 인식 객체 생성
recognizer = sr.Recognizer()

def recognize_speech_from_mic():
    # 마이크 객체 생성
    with sr.Microphone() as source:
        print("Adjusting for ambient noise, please wait...")
        recognizer.adjust_for_ambient_noise(source, duration=2)
        print("Listening...")

        while True:
            try:
                # 음성 입력 받기
                audio = recognizer.listen(source)
                print("Recognizing...")

                # Google Web Speech API로 음성 인식
                text = recognizer.recognize_google(audio, language="ko-KR")
                print(f"Recognized: {text}")

            except sr.UnknownValueError:
                print("Google Speech Recognition could not understand audio")
            except sr.RequestError as e:
                print(f"Could not request results from Google Speech Recognition service; {e}")
            except Exception as e:
                print(f"An error occurred: {e}")

if __name__ == "__main__":
    try:
        recognize_speech_from_mic()
    except KeyboardInterrupt:
        print("Program terminated by user")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

