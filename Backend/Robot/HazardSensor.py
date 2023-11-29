import sys
sys.path.append('.')

class HazardSensor:
    def __init__(self):
#        self._isHazard = False  # 초기값은 False로 설정
        self._hazardList = set()
