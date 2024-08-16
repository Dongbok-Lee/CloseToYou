from gtts import gTTS
import pygame
import os
from pydub import AudioSegment

def text_to_speech(text, lang='ko'):
    # gTTS 객체 생성
    tts = gTTS(text=text, lang=lang)
    # 임시 파일로 저장
    filename = "temp.mp3"
    tts.save(filename)

    # pydub을 사용하여 볼륨 증가
    sound = AudioSegment.from_file(filename)
    louder_sound = sound + 10  # 볼륨을 지정한 데시벨만큼 증가
    louder_filename = "temp_louder.mp3"
    louder_sound.export(louder_filename, format="mp3")

    # pygame 초기화
    pygame.mixer.init()
    pygame.mixer.music.load(louder_filename)
    pygame.mixer.music.set_volume(1.0)  # 볼륨을 최대치로 설정
    pygame.mixer.music.play()


    while pygame.mixer.music.get_busy():
        pygame.time.Clock().tick(10)

    # 임시 파일 삭제
    os.remove(filename)
    os.remove(louder_filename)

if __name__ == "__main__":
    try:
        while True:
            text = input("Enter text to speak (or 'exit' to quit): ")
            if text.lower() == 'exit':
                break
            text_to_speech(text)
    except KeyboardInterrupt:
        print("Program terminated by user")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
