from Backend.OperationArea.OperationArea import OperationArea
from collections import deque
from Backend.ADD_ON.RobotMovementInterface import RobotMovementInterface
class PathGenerator:
    def __init__(self, _operation_area_instance, _initial_robot_position=[0,0]):
        # 1. OperationArea class의 instance를 필드값으로 가질 것.
        self._operation_area_instance = _operation_area_instance

        # 2. robotPosition: [int xPos, int yPos]와 같은 필드값을 가질 것.
        self._robot_position = _initial_robot_position
        self._robotMovementInterface = RobotMovementInterface()
        
        # 3. movementQueue: 2d vector들을 queue의 형태로 저장하는 필드값을 가질 것.
        self._movement_queue = deque()
    
    def GeneratePath(self):
        print("GeneratePath test")
        self.RequestRobotPosition()
        
    def RequestRobotPosition(self):
        self.robot_position = self._robotMovementInterface.RequestRobotPosition()
        return self.robot_position
        
    def GetNextPosition(self):
        print("GetNextPostion test")
        
#temp1 = OperationArea()        
#temp = PathGenerator(temp1)
#print(temp.robotMovementInterface.RequestRobotPosition())
#print(temp.RequestRobotPosition())



#temp.RequestRobotPosition()
#temp.GetNextPosition()
