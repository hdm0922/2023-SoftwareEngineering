from Backend.OperationArea.OperationArea import OperationArea
from Backend.ADD_ON.PathGenerator import PathGenerator

class OperationAreaInterface:
    def __init__(self, _area_size=(0, 0), _must_go_positions=None, _hazard_positions=None):
        self._operation_area_instance = OperationArea(_area_size=_area_size, _must_go_positions=_must_go_positions, _hazard_positions=_hazard_positions)

        # Adding PathGenerator as a field
        # You may need to adjust the arguments based on your PathGenerator's constructor
        self.path_generator_instance = PathGenerator(_operation_area_instance=self._operation_area_instance, _initial_robot_position=[0, 0])

    def get_area_size(self):
        return self._operation_area_instance.get_area_size()

    def get_must_go_positions(self):
        return self._operation_area_instance.get_must_go_positions()

    def get_hazard_positions(self):
        return self._operation_area_instance.get_hazard_positions()

    def initialize_area_size(self, area_size):
        self._operation_area_instance.initialize_area_size(area_size)

    def initialize_must_go_positions(self, must_go_positions):
        self._operation_area_instance.initialize_must_go_positions(must_go_positions)

    def initialize_hazard_positions(self, hazard_positions):
        self._operation_area_instance.initialize_hazard_positions(hazard_positions)

    def add_to_must_go_positions(self, new_position):
        self._operation_area_instance.add_to_must_go_positions(new_position)

    def add_to_hazard_positions(self, new_position):
        self._operation_area_instance.add_to_hazard_positions(new_position)
        
    def RequestToGenerate(self):
        # Update the operation_area_instance field of path_generator_instance
        print("request 실행전")
        self.path_generator_instance._operation_area_instance = self._operation_area_instance
        self.path_generator_instance.GeneratePath()
        print("request 실행후")


temp = OperationAreaInterface()

print(temp.path_generator_instance._robot_position)
temp.RequestToGenerate()



# 예제 사용
#interface = OperationAreaInterface()

# 메서드 호출
#print(interface.get_area_size())            # 출력: (10, 10)
#print(interface.get_must_go_positions())    # 출력: {(1, 1), (2, 2)}
#print(interface.get_hazard_positions())     # 출력: {(3, 3)}

# 값 수정
#interface.initialize_area_size((20, 20))
#interface.initialize_must_go_positions({(4, 4), (5, 5)})
#interface.initialize_hazard_positions({(6, 6), (7, 7)})

# 수정된 값 출력
#print(interface.get_area_size())            # 출력: (20, 20)
#print(interface.get_must_go_positions())    # 출력: {(4, 4), (5, 5)}
#print(interface.get_hazard_positions())     # 출력: {(6, 6), (7, 7)}

# 추가
#interface.add_to_must_go_positions((8, 8))
#interface.add_to_hazard_positions((9, 9))

# 수정된 값 출력
#print(interface.get_must_go_positions())    # 출력: {(4, 4), (5, 5), (8, 8)}
#print(interface.get_hazard_positions())     # 출력: {(6, 6), (7, 7), (9, 9)}