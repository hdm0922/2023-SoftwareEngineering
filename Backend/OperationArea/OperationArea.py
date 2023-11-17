class OperationArea:
    def __init__(self, _area_size=(0, 0), _must_go_positions=None, _hazard_positions=None):
        self._area_size = _area_size
        self._must_go_positions = _must_go_positions or set()
        self._hazard_positions = _hazard_positions or set()

    def get_area_size(self):
        return self._area_size

    def get_must_go_positions(self):
        return self._must_go_positions

    def get_hazard_positions(self):
        return self._hazard_positions

    def initialize_area_size(self, _area_size):
        self._area_size = _area_size

    def initialize_must_go_positions(self, _must_go_positions):
        self._must_go_positions = set(_must_go_positions)

    def initialize_hazard_positions(self, _hazard_positions):
        self._hazard_positions = set(_hazard_positions)

    def add_to_must_go_positions(self, _new_position):
        self._must_go_positions.add(_new_position)

    def add_to_hazard_positions(self, _new_position):
        self._hazard_positions.add(_new_position)

