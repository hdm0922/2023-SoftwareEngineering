import sys
sys.path.append('.')


from Backend.Robot.ColorBlobSensor import ColorBlobSensor
from Backend.Robot.HazardSensor import HazardSensor
from Backend.Robot.PostionSensor import PositionSensor

class SIM:
    def __init__(self, _hazard_sensor =HazardSensor() , _color_blob_sensor = ColorBlobSensor(), _position_sensor =PositionSensor([1,1])):
        self._color_blob_sensor = _color_blob_sensor

        self._hazard_sensor = _hazard_sensor

        self._position_sensor = _position_sensor
        
        
    def nextmotion(self, _type):
        if _type == "move":
            print("SIM : move 요청")
            is_Correct = self._position_sensor.RequestMove()    
            return is_Correct
        elif _type == "rotate":
            print("SIM : rotate 요청")
            is_Correct = 0
            self._position_sensor.RequestRotate()
            return is_Correct
            
        elif _type == "compensate":
            print("SIM: compensate 요청")
            self._position_sensor.RequestCompensate()
        
        


#temp = SIM()
#temp.nextmotion("move")


#    def NotifyUpdate(self):
 #       self._position_sensor.DetectPosition()
#temp1 = HazardSensor()
#temp2 = ColorBlobSensor()


#temp = SIM(temp1, temp2)
#print(temp._position_sensor.get_position())