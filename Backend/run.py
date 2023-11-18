import sys
sys.path.append('.')

from flask import Flask, request, jsonify, render_template
from Backend.ADD_ON.OperationAreaInterface import OperationAreaInterface
from Backend.Robot.ColorBlobSensor import ColorBlobSensor
from Backend.Robot.HazardSensor import HazardSensor
from Backend.Robot.PostionSensor import PositionSensor
from Backend.ADD_ON.RobotMovementInterface import RobotMovementInterface
from Backend.Robot.SIM import SIM
import ast  # ast 모듈 추가

# app = Flask(__name__)
app = Flask(__name__, static_url_path='', static_folder='../frontend/frontend-app/build/static')
areaInterface = OperationAreaInterface()
robotMovementInterface = RobotMovementInterface()
colorBlobSensor = ColorBlobSensor()
hazardSensor = HazardSensor()
positionSensor = PositionSensor()
SIM_Instance = SIM()
SIM_Instance._color_blob_sensor = colorBlobSensor
SIM_Instance._hazard_sensor = hazardSensor
SIM_Instance._position_sensor = positionSensor
robotMovementInterface._sim_instance = SIM_Instance
areaInterface.path_generator_instance._robotMovementInterface = robotMovementInterface


def convert_to_2d_set(positions):
    return set(tuple(map(int, pos)) for pos in positions)

def getPosition(inputStr):
    return (int(inputStr[1]), int(inputStr[3]))

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
        return getPosition(inputStr)
    else :
        return getPositions(inputStr)


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/temp', methods=['POST'])
def process_data():
    if request.method == 'POST':
        data = request.get_json()
#        print(data.get('areaSize'))
#        print(data.get('mustGoPositions'))
#        print(data.get('hazardPositions'))
        area_size = getPositionData(data.get('areaSize', "0,0"))
        mustGoPositions = getPositionData(data.get('mustGoPositions', []))
        hazardPositions = getPositionData(data.get('hazardPositions', []))
        robot_position = getPositionData(data.get('start', []))
        # areaSize는 그대로 사용
#        area_size = ast.literal_eval(data.get('areaSize', "(0,0)"))
        # mustGoPositions 및 hazardPositions를 문자열에서 튜플로 변환하고 2D 벡터의 세트로 변환
#        must_go_positions = convert_to_2d_set(ast.literal_eval(data.get('mustGoPositions', [])))
#        hazard_positions = convert_to_2d_set(ast.literal_eval(data.get('hazardPositions', [])))
        #robot_position = ast.literal_eval(data.get('robot_position', [0, 0]))  # Add this line
        print("////")
        print(robot_position)
        print("////")
        areaInterface.initialize_area_size(area_size)
        areaInterface.initialize_must_go_positions(mustGoPositions)
        areaInterface.initialize_hazard_positions(hazardPositions)
        robotMovementInterface._sim_instance._position_sensor._RobotPosition=robot_position
        # 변환된 데이터 출력
        print("Area Size:", areaInterface.get_area_size())
        print("Must Go Positions:", areaInterface.get_must_go_positions())
        print("Hazard Positions:", areaInterface.get_hazard_positions())
        print("///")
        print(areaInterface.path_generator_instance.RequestRobotPosition())
        print("///")
        # 여기에서 데이터를 처리하고 응답을 생성할 수 있습니다.
        #areaInterface.RequestToGenerate()
        response = {"message": "Data received and processed successfully"}
        return jsonify(response)

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)