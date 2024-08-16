import sys
sys.path.append('/home/orin/ai/S11P12B201/clothing-classification')
import jetson_nano_test

if __name__ == "__main__":
    result1, result2 = jetson_nano_test.run()
    print(f"옷 종류: {result1}, 패턴: {result2}")

