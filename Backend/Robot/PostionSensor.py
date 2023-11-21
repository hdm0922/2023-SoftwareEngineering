import sys
from random import *
sys.path.append('.')

class PositionSensor:
    def __init__(self, _RobotPosition = [0,0],_direction = 0):
        self._RobotPosition = _RobotPosition
        self._direction = _direction # 0, 1, 2, 3  : up, right, down, left
        self.boundarysize = (0,0)
        self.boundaryPos = set()
        
        
    def get_position(self):
        return self._RobotPosition
    
    def get_direction(self):
        return self._direction
    
    def RequestMove(self):
        i = randint(1, 100)
        if i<81:
            print("possensor : 정상 운행")
            dPos = [(0,1), (1,0), (0,-1), (-1,0)]
            moving = dPos[self._direction]
            [realX, realY] = self._RobotPosition
            self._RobotPosition = [realX+moving[0], realY + moving[1]]
            print("이동후 여기로 갔습니다.")
            print(self.get_position())
            
       # elif i<91:
        #    print("possensor : 한칸 더 간 오류 발생")
         #   dPos = [(0,1), (1,0), (0,-1), (-1,0)]
         #   moving = dPos[self._direction]
            
        elif i<101:
            print("possensor: 오류2")
        return 0
    
    