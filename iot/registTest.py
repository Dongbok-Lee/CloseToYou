from features.sensors import nfc, microphone, speaker
from features import searchClothes, registClothes
from pyMySqlConnection import execute_query
import speech_recognition as sr
import time


if __name__ == "__main__":
    registClothes.registClothes()
