from Flask.Robot.ColorBlobSensor import ColorBlobSensor
from Flask.Robot.HazardSensor import HazardSensor
from Flask.Robot.PostionSensor import PositionSensor

class SIM:
    def __init__(self):
        # ColorBlobSensor 클래스의 인스턴스 생성
        self.color_blob_sensor = ColorBlobSensor()

        # HazardSensor 클래스의 인스턴스 생성
        self.hazard_sensor = HazardSensor()

        # PositionSensor 클래스의 인스턴스 생성
        self.position_sensor = PositionSensor([3,4])
        
    def NotifyUpdate(self):
        self.position_sensor.DetectPosition()
    
#temp = SIM()
#print(temp.position_sensor.get_position())