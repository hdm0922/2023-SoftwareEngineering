import sys
sys.path.append('.')
from Backend.OperationArea.OperationArea import OperationArea
from collections import deque
from Backend.ADD_ON.RobotMovementInterface import RobotMovementInterface


class PathGenerator:
    def __init__(self,_robot_Movement_Interface = RobotMovementInterface() , _initial_robot_position=[0,0]
                 ,_operation_area_instance= OperationArea()):

        self._operation_area_instance = _operation_area_instance
        self._robot_position = _initial_robot_position
        self._robotMovementInterface = _robot_Movement_Interface
        
        self._movement_queue = deque()
    
    def GeneratePath(self):
        print("GeneratePath test")
        self.RequestRobotPosition()
        
    def RequestRobotPosition(self):
        self.robot_position = self._robotMovementInterface.RequestRobotPosition()
        return self.robot_position
        
    def GetNextPosition(self):
        print("GetNextPostion test")
        



oparea = OperationArea((9,9), [(3,3),(4,4),(5,5)], [(2,2),(7,7)])
rbInterface = RobotMovementInterface()
rbInterface._sim_instance._position_sensor._RobotPosition = (0,1)

print(rbInterface.RequestRobotPosition())
hazardPos = oparea.get_hazard_positions()
importPos = oparea.get_important_positions()
opsize = oparea.get_area_size()

#print(oparea.get_important_positions())
#print(oparea.get_hazard_positions())