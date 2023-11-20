import sys
sys.path.append('.')
from Backend.Robot.SIM import SIM
from Backend.ADD_ON.SensorInterface import SensorInterface

class RobotMovementInterface:
    def __init__(self,_sim_instance =SIM(),_Sensor_Interface_Instance =SensorInterface() ,_expected_destination = [0,0]):
        self._sim_instance = _sim_instance
        self._expected_destination = _expected_destination
        self._Sensor_Interface_Instance = _Sensor_Interface_Instance
        
    def RequestRobotPosition(self):
        return self._Sensor_Interface_Instance.detectPos()
    
    def RequestRobotDirection(self):
        return self._Sensor_Interface_Instance.detectDir()
    
    

#    def move(self):
#        self._sim_instance.notify()
