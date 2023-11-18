import sys
sys.path.append('.')
from Backend.Robot.SIM import SIM

class RobotMovementInterface:
    def __init__(self,_sim_instance =SIM(),_expected_destination = [0,0]):
        self._sim_instance = _sim_instance
        self._expected_destination = _expected_destination

    def RequestRobotPosition(self):
        return self._sim_instance._position_sensor.get_position()
    
    def RequestNextPostion(self):
        return

#    def move(self):
#        self._sim_instance.notify()
