import sys
from random import *
sys.path.append('.')

class PositionSensor:
    def __init__(self, _RobotPosition = [0,0],_direction = 0):
        self._RobotPosition = _RobotPosition
        self._direction = _direction # 0, 1, 2, 3  : up, right, down, left
        self.boundarysize = [9,9]
        self.boundaryPos = set()
        
        
    def get_position(self):
        return self._RobotPosition
    
    def get_direction(self):
        return self._direction
    
    def RequestMove(self):
        i = randint(1, 100)
        if i<11:
            print("possensor : 정상 운행")
            dPos = [(0,1), (1,0), (0,-1), (-1,0)]
            moving = dPos[self._direction]
            [realX, realY] = self._RobotPosition
            self._RobotPosition = [realX+moving[0], realY + moving[1]]
            print("이동후 여기로 갔습니다.")
            print(self.get_position())
            return 0
            
        elif i<21:
            print("possensor : 움직이지 않은 오류")
            print(self.get_position())
            return 1
            
        elif i<101:
            print("possensor: 2칸 이동한 움직임 오류")
            dPos = [(0,2), (2,0), (0,-2), (-2,0)]
            moving = dPos[self._direction]
            [realX, realY] = self._RobotPosition
            tempPos = [realX+moving[0], realY + moving[1]]
            tem = tuple(tempPos)
            if tem in self.boundaryPos or not (0 <= tempPos[0] < self.boundarysize[0]) or not (0 <= tempPos[1] < self.boundarysize[1]):
                print("pos sensor 2칸 이동하려햇으나 경계에 걸려 정지")
                print(self.get_position())
                return 1
            self._RobotPosition = tempPos
            
            print(self.get_position())
            return 2
        
    
    
    
#temp = PositionSensor()
#temp.boundaryPos = {(4, 5), (7, 6), (7, 7), (5, 6), (3, 2)}
    