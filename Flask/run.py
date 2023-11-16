from flask import Flask, request, jsonify
from Flask.ADD_ON.OperationAreaInterface import OperationAreaInterface
from Flask.Robot.ColorBlobSensor import ColorBlobSensor
from Flask.Robot.HazardSensor import HazardSensor
from Flask.Robot.PostionSensor import PositionSensor
from Flask.Robot.SIM import SIM
import ast  # ast 모듈 추가


app = Flask(__name__)
areaInterface = OperationAreaInterface()
colorBlobSensor = ColorBlobSensor()
hazardSensor = HazardSensor()
positionSensor = PositionSensor(0,0)
SIM_Instance = SIM()
SIM_Instance.color_blob_sensor = colorBlobSensor
SIM_Instance.hazard_sensor = hazardSensor
SIM_Instance.position_sensor = positionSensor


def convert_to_2d_set(positions):
    return set(tuple(map(int, pos)) for pos in positions)

@app.route('/')
def home():
    return 'This is home!'

@app.route('/temp', methods=['POST'])
def process_data():
    if request.method == 'POST':
        data = request.get_json()

        # areaSize는 그대로 사용
        area_size = ast.literal_eval(data.get('areaSize', "(0,0)"))
        # mustGoPositions 및 hazardPositions를 문자열에서 튜플로 변환하고 2D 벡터의 세트로 변환
        must_go_positions = convert_to_2d_set(ast.literal_eval(data.get('mustGoPositions', [])))
        hazard_positions = convert_to_2d_set(ast.literal_eval(data.get('hazardPositions', [])))
        
        areaInterface.initialize_area_size(area_size)
        areaInterface.initialize_must_go_positions(must_go_positions)
        areaInterface.initialize_hazard_positions(hazard_positions)
        # 변환된 데이터 출력
        print("Area Size:", areaInterface.get_area_size())
        print("Must Go Positions:", areaInterface.get_must_go_positions())
        print("Hazard Positions:", areaInterface.get_hazard_positions())
        # 여기에서 데이터를 처리하고 응답을 생성할 수 있습니다.
        areaInterface.RequestToGenerate()
        response = {"message": "Data received and processed successfully"}
        return jsonify(response)

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)