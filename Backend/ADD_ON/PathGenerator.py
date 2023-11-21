import sys
sys.path.append('.')
from Backend.OperationArea.OperationArea import OperationArea
from collections import deque
from Backend.ADD_ON.RobotMovementInterface import RobotMovementInterface
from Backend.test1.test1 import *

class PathGenerator:
    def __init__(self,_robot_Movement_Interface = RobotMovementInterface() , _initial_robot_position=[0,0]
                 ,_operation_area_instance= OperationArea()):

        self._operation_area_instance = _operation_area_instance
        self._robot_position = _initial_robot_position
        self._robotMovementInterface = _robot_Movement_Interface
        
        self._movement_queue = []
    
    def GeneratePath(self):
        startpos = self.RequestRobotPosition()
        ltt = tuple(startpos)
        hazardPos = self._operation_area_instance.get_hazard_positions()
        importPos = self._operation_area_instance.get_important_positions()
        colorPos = self._operation_area_instance.get_colorblob_positions()
        opsize = self._operation_area_instance.get_area_size()
        targetPos = importPos.union(colorPos)
        self._movement_queue = mer(opsize,ltt,hazardPos,targetPos)
#        del(self._movement_queue[0])
        self._robotMovementInterface._route_list = deque(self._movement_queue)

        return self._movement_queue
        
    def RequestRobotPosition(self):
        self.robot_position = self._robotMovementInterface.RequestRobotPosition()
        return self.robot_position
        
    def GetNextPosition(self):
        print("GetNextPostion test")
        



#oparea = OperationArea((9,9), set([(3,3),(4,4),(5,5)]), set([(2,2),(7,7)]), set([(1,6),(2,1)]))
#rbInterface = RobotMovementInterface()
#temp = PathGenerator(rbInterface, [0,0], oparea)
#print(temp.GeneratePath())
#print(type(temp._robotMovementInterface._route_list))
#print((temp._robotMovementInterface._route_list))






#print(rbInterface.RequestRobotPosition())
#hazardPos = oparea.get_hazard_positions()
#importPos = oparea.get_important_positions()
#opsize = oparea.get_area_size()



#print(oparea.get_important_positions())
#print(oparea.get_hazard_positions())

#hazardPos = [(1, 1), (2, 2), (3, 3),(4,4), (5,5), (6,6), (7,7)]
#importPos = [(1, 2), (2, 1), (3, 4), (7,9), (8,1), (1,8)]
#opsize = (9, 9)
#startPos = (0, 0)

#temp = mer(opsize, startPos, hazardPos, importPos)
#print((temp))