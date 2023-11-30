import sys
sys.path.append('.')
from Backend.Robot.ColorBlobSensor import ColorBlobSensor
from Backend.Robot.HazardSensor import HazardSensor
from Backend.Robot.PostionSensor import PositionSensor
#from Backend.ADD_ON.OperationAreaInterface import OperationAreaInterface

class SensorInterface:
    def __init__(self, _hazard_sensor = HazardSensor(), _color_blob_sensor = ColorBlobSensor(), _position_sensor= PositionSensor()):
        self._hazardSensor = _hazard_sensor
        self._colorBlobSensor = _color_blob_sensor
        self._positionSensor = _position_sensor
    
    def detectPos(self):
        return self._positionSensor.get_position()
    def detectDir(self):
        return self._positionSensor.get_direction()
    
    def detectHazrd(self):
        (realX, realY) = self.detectPos()
        realDir = self.detectDir()
        dPos = [(0,1), (1,0), (0,-1), (-1,0)]
        (dx,dy) = dPos[realDir]
        (DetectX, DetectY) = (realX+dx, realY+dy)
        if (DetectX, DetectY) in self._hazardSensor._hazardList:
            try:
                self._hazardSensor._hazardList.remove((DetectX, DetectY))
            except KeyError:
                pass
            return tuple(("H", (DetectX, DetectY)))
        else:
            return
        
    def detectColor(self):
        (realX, realY) = self.detectPos()
        dPos = [(0,1), (1,0), (0,-1), (-1,0)]
        relist = []
        for i in dPos:
            (dx,dy) = i
            (DetectX, DetectY) = (realX+dx, realY+dy)
            if (DetectX, DetectY) in self._colorBlobSensor._colorBlobList:
                try:
                    self._colorBlobSensor._colorBlobList.remove((DetectX, DetectY))
                except KeyError:
                    pass
                relist.append(("C", (DetectX, DetectY)))               
        return relist
    
    def detectNnotify(self, operationareainterface, newPos = []):
        if newPos:
            for i in newPos:
                if i[0] == 'C':
                    operationareainterface.add_to_colorblob_positions(i[1])
                    #print(areaInterface.get_colorblob_positions())
                elif i[0] == 'H':
                    operationareainterface.add_to_hazard_positions(i[1])
            return operationareainterface.RequestToGenerate()
        return
        
    
    
    

temp = SensorInterface()
temp._hazardSensor._hazardList = set([0,1])
temp._colorBlobSensor._colorBlobList = set([])
h = temp.detectHazrd()
c =temp.detectColor()
c.append(h)
print(type(c[0]))

#if h:
 #   print("asdf")
 #   c.append(h)
#if c:
#    print("ddd")


#reunknownObjects = ""   
#c.append(h)
#for i in c:
#    reunknownObjects += i[0]
#    reunknownObjects += str(i[1][0])
#    reunknownObjects += str(i[1][1])
#print(reunknownObjects)