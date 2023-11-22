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
        if len(self._route_list) == 1:
            print("큐가 비었습니다")
            return (4, None, None)
        (ex_x, ex_y) = self._route_list[0]
        (re_x, re_y) = self.RequestRobotPosition()
        if ex_x == re_x and ex_y == re_y:
            (is_correctMove, motion) = self.move()
            route_list = list(self._route_list)
            return (is_correctMove, motion, route_list)
        
            
        else:
            (is_correctMove, motion) = self.compensate()
            route_list = list(self._route_list)
            return (is_correctMove,motion, route_list)
            
        

    def move(self):
        (ex_x, ex_y) = self._route_list[0]
        dir = self.RequestRobotDirection()
        [next_x, next_y] = self._route_list[1]
        dx = next_x - ex_x
        dy = next_y - ex_y
        dPos = [(0,1), (1,0), (0,-1), (-1,0)]
        if dPos[dir] == (dx,dy):
            print("다음행동은 move입니다")
            is_correctMove = self._sim_instance.nextmotion("move")
            if is_correctMove == 0:
                self._route_list.popleft()
            return (is_correctMove, "Move")
        else:
            print("다음행동은 rotate 입니다.")
            self._sim_instance.nextmotion("rotate") 
            return(0,"Rotate")

    def compensate(self):
        print("compensate 호출")
        [next_x, next_y] = self._route_list[0]
        print("가야할 곳 :", [next_x, next_y])
        (re_x, re_y) = self.RequestRobotPosition()
        print("현재 위치: ",(re_x, re_y))
        dx = next_x - re_x
        dy = next_y - re_y
        print("dx, dy : ", dx, dy)
        ddir = 0
        if dx in {1, 2}:
            ddir = 1
        elif dx in {-1, -2}:
            ddir = 3
        elif dy in {1, 2}:
            ddir = 0
        elif dy in {-1, -2}:
            ddir = 2
        
        print(ddir)
        realDirect = self.RequestRobotDirection()
        print(realDirect)
        if realDirect != ddir:
            self._sim_instance.nextmotion("rotate")
            return(0,"Rotate")
        
        else:
            self._sim_instance.nextmotion("compensate")
            return(0,"Move")
        



#temp = RobotMovementInterface()
#temp._Sensor_Interface_Instance._positionSensor._RobotPosition = [4,4]
#temp._sim_instance._position_sensor = temp._Sensor_Interface_Instance._positionSensor
#temp._expected_destination = [4,4]
#temp._Sensor_Interface_Instance._positionSensor.boundaryPos ={(4,6)}
#temp._route_list = deque([(4,4),(4,5),(5,5)])



#print("///")
#print("///")
#print(type(temp._Sensor_Interface_Instance._positionSensor.boundaryPos))
#print(temp.decision_Move_of_Type())
#print(temp.decision_Move_of_Type())
#print(temp._route_list[0])