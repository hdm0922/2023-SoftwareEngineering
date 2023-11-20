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
SIM_Instance = SIM(hazardSensor, positionSensor,positionSensor)
robotMovementInterface = RobotMovementInterface(SIM_Instance)
pathGenrator_instace = PathGenerator(robotMovementInterface)
areaInterface._path_generator_instance = pathGenrator_instace
sensorInterpace = SensorInterface(hazardSensor,colorBlobSensor, positionSensor)



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
def process_data():
    if request.method == 'POST':
        data = request.get_json()
        area_size = getPosition(data.get('areaSize', "0,0"))
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

        # 변환된 데이터 출력
        print("Area Size:", areaInterface.get_area_size())
        print("Must Go Positions:", areaInterface.get_important_positions())
        print("Hazard Positions:", areaInterface.get_hazard_positions())
        print("color_blob posiotn:", areaInterface.get_colorblob_positions())
        print("robot start positions:", areaInterface._path_generator_instance.RequestRobotPosition())
        # 여기에서 데이터를 처리하고 응답을 생성할 수 있습니다.
        #areaInterface.RequestToGenerate()
        
        rearea_size = tts(area_size)
        reimportant = tlts(importantPositions)
        rehazard = tlts(hazardPositions)
        rerobotp = tts(robot_position)
     #   recolor = tlts(colorblob_positions)
        response = {"areaSize": rearea_size,
            "importantPositions": reimportant,
            "hazardPositions": rehazard,
 #           "colorBlobPositions" :recolor,
            "robotPosition": rerobotp}
        return jsonify(response)
    
@app.route('/temp2', methods=['POST'])
def updatedata():
    if request.method == 'POST':
        data = request.get_json()
        postype = data.get('target', "string type")
        x = data.get('x', 0)
        y = data.get('y', 0)
        print(x , y, postype)
    
    return jsonify({'success': True}), 200

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)