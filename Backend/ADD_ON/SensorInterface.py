import sys
sys.path.append('.')
from Backend.Robot.ColorBlobSensor import ColorBlobSensor
from Backend.Robot.HazardSensor import HazardSensor
from Backend.Robot.PostionSensor import PositionSensor


class SensorInterface:
    def __init__(self, _hazard_sensor, _color_blob_sensor, _position_sensor):
        self._hazardSensor = _hazard_sensor
        self._colorBlobSensor = _color_blob_sensor
        self._positionSensor = _position_sensor
        
