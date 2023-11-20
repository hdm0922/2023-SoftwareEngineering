import sys
sys.path.append('.')

class PositionSensor:
    def __init__(self, _RobotPosition = [0,0],_direction = 0):
        self._RobotPosition = _RobotPosition
        self._direction = _direction # 0, 1, 2, 3  : up, right, down, left
        
    def get_position(self):
        return self._RobotPosition
    
    def get_direction(self):
        return self._direction
    
    def DetectPosition(self):
        print("DetectPostion Test")
    
    
    