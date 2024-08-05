from nfc import read_nfc

def run():






if __ name__ == "__main__":
    i2c = busio.I2C(board.SCL, board.SDA)
    pn532 = PN532_I2C(i2c, debug=False)
    ic, ver, rev, support = pn532.firmware_version

    run()
