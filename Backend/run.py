import sys
sys.path.append('.')

from flask import Flask, request, jsonify, render_template
from Backend.ADD_ON.OperationAreaInterface import OperationAreaInterface
from Backend.Robot.ColorBlobSensor import ColorBlobSensor
from Backend.Robot.HazardSensor import HazardSensor
from Backend.Robot.PostionSensor import PositionSensor
from Backend.ADD_ON.RobotMovementInterface import RobotMovementInterface
from Backend.ADD_ON.SensorInterface import SensorInterface
from Backend.ADD_ON.PathGenerator import PathGenerator
from Backend.Robot.SIM import SIM
import ast  # ast 모듈 추가

import json # build 자동화를 위한 json 라이브러리

# app = Flask(__name__)
app = Flask(__name__, static_url_path='', static_folder='../frontend/frontend-app/build')
areaInterface = OperationAreaInterface()
colorBlobSensor = ColorBlobSensor()
hazardSensor = HazardSensor()
positionSensor = PositionSensor()
sensorInterpace = SensorInterface(hazardSensor,colorBlobSensor, positionSensor)
SIM_Instance = SIM(hazardSensor, positionSensor,positionSensor)
robotMovementInterface = RobotMovementInterface(SIM_Instance, sensorInterpace)
pathGenrator_instace = PathGenerator(robotMovementInterface)
areaInterface._path_generator_instance = pathGenrator_instace




def convert_to_2d_set(positions):
    return set(tuple(map(int, pos)) for pos in positions)

def getPosition(inputStr):
    return (int(inputStr[1]), int(inputStr[3]))

def getPosition2(inputStr):
    return ([(int(inputStr[1]), int(inputStr[3]))])

def getPositions(inputStr):
    Positions = []
    N = int( (len(inputStr) - 2)/5 )
    for i in range (0, N):
        x = int( inputStr[2 + 5*i] )
        y = int( inputStr[4 + 5*i] )
        Positions.append( (x,y) )
    return Positions

def getPositionData(inputStr):
    
    if ( len(inputStr) == 5 ) :
        return getPosition2(inputStr)
    else :
        return getPositions(inputStr)

def tts(tuple_value):
    string_result = ''.join(map(str, tuple_value))
    return string_result

def tlts(tuple_list):
    string_result = ''.join(''.join(map(str, t)) for t in tuple_list)
    return string_result


@app.route('/')
def home():    
    
    with open('./frontend/frontend-app/build/asset-manifest.json', 'r') as asset_manifest_file:
            asset_manifest_json = json.load(asset_manifest_file)

    main_js_file_name = asset_manifest_json["files"]["main.js"]
    main_css_file_name = asset_manifest_json["files"]["main.css"]
    
    return render_template('index.html', main_js_file_name=main_js_file_name,
                                         main_css_file_name=main_css_file_name)


@app.route('/temp', methods=['POST'])
def temp():  
    if request.method == 'POST':
        temp = None
        response = {
                "test" : temp
                }
        return jsonify(response)

@app.route('/data-initialize', methods=['POST'])
def process_data():
    if request.method == 'POST':
        data = request.get_json()
        area_size = getPosition(data.get('areaSize', "0,0"))
        [tx, ty] = area_size
        area_size = [tx+1,ty+1]
        importantPositions = getPositionData(data.get('importantPositions', []))
        hazardPositions = getPositionData(data.get('hazardPositions', []))
        robot_position = getPosition(data.get('robotPosition', []))
        colorblob_positions = getPositionData(data.get('colorBlobPositions', []))
#        print(tts(area_size))
#        print(tlts(importantPositions))
#        print(tlts(hazardPositions))
#        print(tts(robot_position))
#        print(colorblob_positions)
        areaInterface.initialize_area_size(area_size)
        areaInterface.initialize_important_positions(importantPositions)
        areaInterface.initialize_hazard_positions(hazardPositions)
        areaInterface.initialize_colorblob_positions(colorblob_positions)
        robotMovementInterface._sim_instance._position_sensor._RobotPosition=robot_position
        robotMovementInterface._expected_destination = robot_position
        print("테스트 할 부분")
        print(sensorInterpace._positionSensor.get_position())
        print("테스트 할 부분")
        # 변환된 데이터 출력
        print("Area Size:", areaInterface.get_area_size())
        print("Must Go Positions:", areaInterface.get_important_positions())
        print("Hazard Positions:", areaInterface.get_hazard_positions())
        print("color_blob posiotn:", areaInterface.get_colorblob_positions())
        print("robot start positions:", areaInterface._path_generator_instance.RequestRobotPosition())
        positionSensor.boundarysize = areaInterface.get_area_size()
        positionSensor.boundaryPos=areaInterface.get_hazard_positions().union(positionSensor.boundaryPos)
        positionSensor.boundaryPos=areaInterface.get_colorblob_positions().union(positionSensor.boundaryPos)
        positionSensor.boundaryPos=areaInterface.get_important_positions().union(positionSensor.boundaryPos)
        print("boundary size:", positionSensor.boundarysize)
        print("boundary pos: ", positionSensor.boundaryPos)
        #print(type(areaInterface.get_hazard_positions()))
        # 여기에서 데이터를 처리하고 응답을 생성할 수 있습니다.
        #areaInterface.RequestToGenerate()
        pathGenrator_instace._operation_area_instance = areaInterface
        route = pathGenrator_instace.GeneratePath()
        print(route)
        
        rearea_size = tts(area_size)
        reimportant = tlts(importantPositions)
        rehazard = tlts(hazardPositions)
        reroute = tlts(route)
        rerobotp = tts(robot_position)
        recolor = tlts(colorblob_positions)
        response = {#"areaSize": rearea_size,
        #    "importantPositions": reimportant,
        #    "hazardPositions": rehazard,
        #    "colorBlobPositions" :recolor,
        #    "robotPosition": rerobotp,
            "robotPath" : reroute
            }
        return jsonify(response)
    
@app.route('/stt-handle', methods=['POST'])
def updatedata():
    if request.method == 'POST':
        data = request.get_json()
        postype = data.get('target', "string type")
        x = data.get('x', 0)
        y = data.get('y', 0)
        if postype == '위험지역':
            hazardSensor._hazardList.add((x,y))
            positionSensor.boundaryPos.add((x,y))
            print(type(positionSensor.boundaryPos))
            print(hazardSensor._hazardList)
            print(positionSensor.boundaryPos)
        elif postype == '중요지점':
            colorBlobSensor._colorBlobList.add((x,y))
            positionSensor.boundaryPos.add((x,y))
            print(colorBlobSensor._colorBlobList)
            print(positionSensor.boundaryPos)
    
    return jsonify({'success': True}), 200

@app.route('/robot-action', methods=['POST'])
def requestmove():
    if request.method == 'POST':
        
        (is_correctMove,motion, route_list) =robotMovementInterface.decision_Move_of_Type()
#        print(is_correctMove)
#        print(motion)
#        print(route_list)
        if is_correctMove == 4:
            return jsonify({'robotAction_robotMovement' : None,
                    'robotAction_moveDistance' : None,
                    'robotAction_isCorrectMove' : None,
                    'robotPath' : None,
                    'unknownObjects' : None})

        rereoute_list = tlts(route_list)
        rerobotAction_isCorrectMove = False
        rerobotAction_moveDistance = 1
        rerobotAction_robotMovement = motion
        reunknownObjects = ""
        if is_correctMove == 0: rerobotAction_isCorrectMove = True
        
        if is_correctMove == 2: rerobotAction_moveDistance=2
        elif is_correctMove ==1: 
            rerobotAction_moveDistance=0

        newPos = sensorInterpace.detectColor()
        newHaz = sensorInterpace.detectHazrd()
        if newHaz:
            newPos.append(newHaz)
        print(len(newPos))
        if newPos:
            for i in newPos:
                reunknownObjects += i[0]
                reunknownObjects += str(i[1][0])
                reunknownObjects += str(i[1][1])
                if i[0] == 'C':
                    areaInterface.add_to_colorblob_positions(i[1])
                elif i[1] == 'H':
                    areaInterface.add_to_hazard_positions(i[i])
                rereoute_list = tlts(areaInterface.RequestToGenerate())
                
                    
                           
        
        
    return jsonify({'robotAction_robotMovement' : rerobotAction_robotMovement,
                    'robotAction_moveDistance' : rerobotAction_moveDistance,
                    'robotAction_isCorrectMove' : rerobotAction_isCorrectMove,
                    'robotPath' : rereoute_list,
                    'unknownObjects' : reunknownObjects})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)