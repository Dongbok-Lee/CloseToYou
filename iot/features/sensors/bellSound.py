import pygame

def play_bellSound():
    # Initialize pygame mixer
    pygame.mixer.init()

    # Load the MP3 file
    pygame.mixer.music.load("Pling Sound.mp3")

    # Play the MP3 file
    pygame.mixer.music.play()

    # Keep the program running while the music plays
    while pygame.mixer.music.get_busy():
        pygame.time.Clock().tick(10)

