class OperationArea:
    def __init__(self, area_size=(0, 0), must_go_positions=None, hazard_positions=None):
        self.area_size = area_size
        self.must_go_positions = must_go_positions or set()
        self.hazard_positions = hazard_positions or set()

    def get_area_size(self):
        return self.area_size

    def get_must_go_positions(self):
        return self.must_go_positions

    def get_hazard_positions(self):
        return self.hazard_positions

    def initialize_area_size(self, area_size):
        self.area_size = area_size

    def initialize_must_go_positions(self, must_go_positions):
        self.must_go_positions = set(must_go_positions)

    def initialize_hazard_positions(self, hazard_positions):
        self.hazard_positions = set(hazard_positions)

    def add_to_must_go_positions(self, new_position):
        self.must_go_positions.add(new_position)

    def add_to_hazard_positions(self, new_position):
        self.hazard_positions.add(new_position)

