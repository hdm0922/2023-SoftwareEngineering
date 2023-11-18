class PositionSensor:
    def __init__(self, _RobotPosition = [0,0]):
        self._RobotPosition = _RobotPosition

    def get_position(self):
        return self._RobotPosition
    
    def DetectPosition(self):
        print("DetectPostion Test")
    
    
    
temp = PositionSensor()
print(temp.get_position())

print(type(temp.get_position()))