from Flask.OperationArea.OperationArea import OperationArea
from collections import deque
from Flask.ADD_ON.RobotMovementInterface import RobotMovementInterface
class PathGenerator:
    def __init__(self, operation_area_instance, initial_robot_position=[0,0]):
        # 1. OperationArea class의 instance를 필드값으로 가질 것.
        self.operation_area_instance = operation_area_instance

        # 2. robotPosition: [int xPos, int yPos]와 같은 필드값을 가질 것.
        self.robot_position = initial_robot_position
        self.robotMovementInterface = RobotMovementInterface()
        
        # 3. movementQueue: 2d vector들을 queue의 형태로 저장하는 필드값을 가질 것.
        self.movement_queue = deque()
    
    def GeneratePath(self):
        print("GeneratePath test")
        self.RequestRobotPosition()
        
    def RequestRobotPosition(self):
        self.robot_position = self.robotMovementInterface.RequestRobotPosition()
        
    def GetNextPosition(self):
        print("GetNextPostion test")
        
temp1 = OperationArea()        
temp = PathGenerator(temp1)
print(temp.RequestRobotPosition())
temp.robotMovementInterface.sim_instance.position_sensor._RobotPosition = [4,4]
print(temp.RequestRobotPosition())



#temp.RequestRobotPosition()
#temp.GetNextPosition()
