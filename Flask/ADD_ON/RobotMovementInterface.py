from Flask.Robot.SIM import SIM

class RobotMovementInterface:
    def __init__(self,expected_destination = [0,0]):
        self.sim_instance = SIM()
        self.expected_destination = expected_destination

    def RequestRobotPosition(self):
        return self.sim_instance.position_sensor.get_position()
    
    def RequestNextPostion(self):
        return

    def move(self):
        self.sim_instance.notify()



temp = RobotMovementInterface()
print(temp.RequestRobotPosition())