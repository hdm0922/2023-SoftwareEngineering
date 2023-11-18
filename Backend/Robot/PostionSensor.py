import sys
sys.path.append('.')

class PositionSensor:
    def __init__(self, _RobotPosition = [0,0]):
        self._RobotPosition = _RobotPosition

    def get_position(self):
        return self._RobotPosition
    
    def DetectPosition(self):
        print("DetectPostion Test")
    
    
    