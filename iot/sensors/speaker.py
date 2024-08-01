from gtts import gTTS
import pygame
import os

def text_to_speech(text, lang='ko'):
    # gTTS 객체 생성
    tts = gTTS(text=text, lang=lang)
    # 임시 파일로 저장
    filename = "temp.mp3"
    tts.save(filename)

    # pygame 초기화
    pygame.mixer.init()
    pygame.mixer.music.load(filename)
    pygame.mixer.music.play()

    while pygame.mixer.music.get_busy():
        pygame.time.Clock().tick(10)

    # 임시 파일 삭제
    os.remove(filename)

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

