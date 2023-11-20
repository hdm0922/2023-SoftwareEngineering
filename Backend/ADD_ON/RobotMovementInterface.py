import sys
sys.path.append('.')
from Backend.Robot.SIM import SIM
from Backend.ADD_ON.SensorInterface import SensorInterface
from collections import deque

class RobotMovementInterface:
    def __init__(self,_sim_instance =SIM(),_Sensor_Interface_Instance =SensorInterface() ,_expected_destination = [0,0]):
        self._sim_instance = _sim_instance
        self._expected_destination = _expected_destination
        self._Sensor_Interface_Instance = _Sensor_Interface_Instance
        self._route_list = deque()
    
        
    def RequestRobotPosition(self):
        return self._Sensor_Interface_Instance.detectPos()
    
    def RequestRobotDirection(self):
        return self._Sensor_Interface_Instance.detectDir()
    
    def decision_Move_of_Type(self):
        ex_x = self._expected_destination[0]
        ex_y = self._expected_destination[1]
        (re_x, re_y) = self.RequestRobotPosition()
        if ex_x == re_x and ex_y == re_y:
            self.move()
            
        else:
            self.compensate()
        

    def move(self):
        ex_x = self._expected_destination[0]
        ex_y = self._expected_destination[1]
        dir = self.RequestRobotDirection()
        [next_x, next_y] = self._route_list[0]
        dx = next_x - ex_x
        dy = next_y - ex_y
        dPos = [(0,1), (1,0), (0,-1), (-1,0)]
        if dPos[dir] == (dx,dy):
            print("다음 행동은 move입니다")
        else:
            print("다음행동은 rotate 입니다.")



temp = RobotMovementInterface()
temp._Sensor_Interface_Instance._positionSensor._RobotPosition = [4,4]
temp._expected_destination = [4,4]
temp._route_list = deque([(4,5)])
temp.decision_Move_of_Type()

print(temp._route_list[0])