from Backend.Robot.ColorBlobSensor import ColorBlobSensor
from Backend.Robot.HazardSensor import HazardSensor
from Backend.Robot.PostionSensor import PositionSensor

class SIM:
    def __init__(self):
        # ColorBlobSensor 클래스의 인스턴스 생성
        self._color_blob_sensor = ColorBlobSensor()

        # HazardSensor 클래스의 인스턴스 생성
        self._hazard_sensor = HazardSensor()

        # PositionSensor 클래스의 인스턴스 생성
        self._position_sensor = PositionSensor([1,1])
        
#    def NotifyUpdate(self):
 #       self._position_sensor.DetectPosition()
    
#temp = SIM()
#print(temp.position_sensor.get_position())