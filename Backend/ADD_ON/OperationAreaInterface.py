import sys
sys.path.append('.')

from Backend.OperationArea.OperationArea import OperationArea
from Backend.ADD_ON.PathGenerator import PathGenerator

class OperationAreaInterface:
    def __init__(self, _area_size=(0, 0), _important_positions=None, _hazard_positions=None, _colorblob_positions = None,
                 _path_generator_instance = PathGenerator()):
        self._operation_area_instance = OperationArea(_area_size=_area_size, _important_positions=_important_positions, _hazard_positions=_hazard_positions, 
                                                      _colorblob_positions= _colorblob_positions)
        self._path_generator_instance = _path_generator_instance

    def get_area_size(self):
        return self._operation_area_instance.get_area_size()
    def get_important_positions(self):
        return self._operation_area_instance.get_important_positions()
    def get_hazard_positions(self):
        return self._operation_area_instance.get_hazard_positions()
    def get_colorblob_positions(self):
        return self._operation_area_instance.get_colorblob_positions()
    def initialize_area_size(self, area_size):
        self._operation_area_instance.initialize_area_size(area_size)
    def initialize_important_positions(self, important_positions):
        self._operation_area_instance.initialize_important_positions(important_positions)
    def initialize_hazard_positions(self, hazard_positions):
        self._operation_area_instance.initialize_hazard_positions(hazard_positions)
    def initialize_colorblob_positions(self, _colorblob_positions):
        self._operation_area_instance.initialize_colorblob_positions(_colorblob_positions)
    def add_to_important_positions(self, new_position):
        self._operation_area_instance.add_to_important_positions(new_position)
    def add_to_hazard_positions(self, new_position):
        self._operation_area_instance.add_to_hazard_positions(new_position)
    def add_to_colorblob_positions(self, new_colorblob_positions):
        self._operation_area_instance.add_to_colorblob_positions(new_colorblob_positions)    
        
    def RequestToGenerate(self):
        # Update the operation_area_instance field of path_generator_instance
        print("request 실행전")
        self.path_generator_instance._operation_area_instance = self._operation_area_instance
        self.path_generator_instance.GeneratePath()
        print("request 실행후")



#print(temp.path_generator_instance._robot_position)
#temp.RequestToGenerate()



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
