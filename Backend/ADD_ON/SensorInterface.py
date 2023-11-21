import sys
sys.path.append('.')
from Backend.Robot.ColorBlobSensor import ColorBlobSensor
from Backend.Robot.HazardSensor import HazardSensor
from Backend.Robot.PostionSensor import PositionSensor


class SensorInterface:
    def __init__(self, _hazard_sensor = HazardSensor(), _color_blob_sensor = ColorBlobSensor(), _position_sensor= PositionSensor()):
        self._hazardSensor = _hazard_sensor
        self._colorBlobSensor = _color_blob_sensor
        self._positionSensor = _position_sensor
    
    def detectPos(self):
        return self._positionSensor.get_position()
    def detectDir(self):
        return self._positionSensor.get_direction()
    
    #def DetectHazard(self):
        

