class ttest:
    def __init__(self,a,b):
        self.a =a
        self.b =b
        
        
    def initialize(self, a, b):
        self.a = a
        self.b = b
        
    def get_values(self):
        return self.a, self.b
    
    
test = ttest(10,20)
print(test.get_values())
print(type(test.get_values()))