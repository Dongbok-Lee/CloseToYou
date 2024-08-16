import sys
sys.path.append('/home/orin/S11P12B201/iot/features/sensors')
import time
import bellSound
import threading
import ctypes

class thread_with_exception(threading.Thread):
    def __init__(self, name):
        threading.Thread.__init__(self)
        self.name = name
        self._stop_event = threading.Event()

    def run(self):
        # target function of the thread class
        try:
            self.check_stop()
            bellSound.play_bgmSound_1()
            self.check_stop()
            bellSound.play_bgmSound_2()
            self.check_stop()
            bellSound.play_bgmSound_3()
            self.check_stop()
            bellSound.play_bgmSound_4()
            self.check_stop()
            bellSound.play_bgmSound_5()
            self.check_stop()
            bellSound.play_bgmSound_6()
            self.check_stop()
            bellSound.play_bgmSound_7()
            self.check_stop()
            bellSound.play_bgmSound_8()
            self.check_stop()
            bellSound.play_bgmSound_9()
            self.check_stop()
            bellSound.play_bgmSound_10()
            self.check_stop()
            bellSound.play_bgmSound_11()
            print('running ' + self.name)
        finally:
            print('ended')

    def check_stop(self):
        if self._stop_event.is_set():
            raise SystemExit()

    def get_id(self):
        # returns id of the respective thread
        if hasattr(self, '_thread_id'):
            return self._thread_id
        for id, thread in threading._active.items():
            if thread is self:
                return id

    def raise_exception(self):
        self._stop_event.set()
        thread_id = self.get_id()
        res = ctypes.pythonapi.PyThreadState_SetAsyncExc(thread_id,
              ctypes.py_object(SystemExit))
        if res > 1:
            ctypes.pythonapi.PyThreadState_SetAsyncExc(thread_id, 0)
            print('Exception raise failure')


def run():
    thread = thread_with_exception(name="BGM Thread")
    thread.start()

    time.sleep(1)
    print("하나")
    time.sleep(10)
    print("둘")

    # Stop the process
    thread.raise_exception()

    print("끝")

run()

