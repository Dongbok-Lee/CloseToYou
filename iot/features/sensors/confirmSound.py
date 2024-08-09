import pygame
import numpy as np

# Initialize pygame mixer
pygame.mixer.init()

# Set up sound parameters
frequency = 3000  # 3000 Hz for a more clear and bright tone
duration = 500  # 500 ms for a longer sound

# Generate a pure sine wave sound
sample_rate = 44100
n_samples = int(round(duration * sample_rate / 1000))
buffer = (4096 * np.sin(2.0 * np.pi * np.arange(n_samples) * frequency / sample_rate)).astype(np.int16)

# Convert the buffer to 2D for stereo sound
stereo_buffer = np.repeat(buffer[:, np.newaxis], 2, axis=1)

# Make sound and play it
sound = pygame.sndarray.make_sound(stereo_buffer)
sound.play()

# Wait for the sound to finish playing
pygame.time.wait(duration)

# Quit pygame mixer
pygame.mixer.quit()

