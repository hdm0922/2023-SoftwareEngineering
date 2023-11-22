from collections import deque

def is_valid(x, y, opsize):
    return 0 <= x < opsize[0] and 0 <= y < opsize[1]

def is_valid2(x, y, opsize, hazardPos, visited):
    opwidth, opheight = opsize
    return 0 <= x < opwidth and 0 <= y < opheight and (x, y) not in hazardPos and (x, y) not in visited

# Code Edited -----------------------------------------

INF = int(1e9)


# returns shortest distance between initialPosition, finalPosition.
def getShortestDistance(operationAreaSize, hazardPositions, initialPosition, finalPosition) :
    
    def getNextPosition(currentPosition, direction) :
        
        nextPositionX = currentPosition[0]
        nextPositionY = currentPosition[1]
        
        if   (direction == 0) : nextPositionX += 1
        elif (direction == 1) : nextPositionX -= 1
        elif (direction == 2) : nextPositionY += 1
        elif (direction == 3) : nextPositionY -= 1
        
        return (nextPositionX, nextPositionY)
    
    def isInBoundary(operationAreaSize, position) :
        isInBoundaryX = (0 <= position[0]) and (position[0] <= operationAreaSize[0])
        isInBoundaryY = (0 <= position[1]) and (position[1] <= operationAreaSize[1])
        return isInBoundaryX and isInBoundaryY

        
    # Array2D initialized with INF
    distanceFromInitial = [[INF for _ in range(operationAreaSize[1] + 1)]
                                for _ in range(operationAreaSize[0] + 1)]
        
    searchQueue = deque( [{ "position": initialPosition, "distance": 0 }] )
    distanceFromInitial[ initialPosition[1] ][ initialPosition[0] ] = 0

    
    while searchQueue :
        
        currentState = searchQueue.popleft()
        
        if ((currentState["position"][0] == finalPosition[0])
        and (currentState["position"][1] == finalPosition[1])) : break
        
        for direction in range (4):
            
            nextPosition = getNextPosition(currentState["position"], direction)
            nextDistance = currentState["distance"] + 1
            
            nextState = { "position": nextPosition, "distance": nextDistance }
            
            if (not isInBoundary(operationAreaSize, nextState["position"])) : continue
            if (nextState["position"] in hazardPositions) : continue
            if (distanceFromInitial[nextState["position"][1]][nextState["position"][0]] <= nextState["distance"]) : continue
            
            distanceFromInitial[nextState["position"][1]][nextState["position"][0]] = nextState["distance"]
            searchQueue.append( nextState )
            
    return distanceFromInitial[ finalPosition[1] ][ finalPosition[0] ]

# returns traversal order starting from robotPosition - mapped by index.
def getTraversalOrderFromDistanceArray2D(givenDistance, robotPositionIndex) :
    
    traversalOrderByIndex = [ int(robotPositionIndex) ]
    
    ALL_VISITED = (1 << len(givenDistance)) - 1
    bitWrittenVisit = (1 << robotPositionIndex)
    
    while ( bitWrittenVisit != ALL_VISITED ) :
        
        currentNode = traversalOrderByIndex[-1]
        
        nextNode = currentNode
        for testNode in range ( len(givenDistance) ) :
            if ( (bitWrittenVisit & (1 << testNode)) ) : continue
            
            nextNode = ( nextNode
                        if ( givenDistance[currentNode][nextNode] <
                             givenDistance[currentNode][testNode])
                        else testNode )
    
        bitWrittenVisit |= (1 << nextNode)
        traversalOrderByIndex.append( nextNode )
    
    return traversalOrderByIndex


# returns traversal orders
def getTraversalOrder(operationAreaSize, robotPosition,
                      hazardPositions, importantPositions) :
    
    # Create an index-mapped array with important positions
    importantPositionsIndexMappedArray = [ robotPosition ]
    for position in importantPositions :
        importantPositionsIndexMappedArray.append( position )
    
    # Create an Array2D with shortest distance :
    # Array2D[ iter ][ jter ] denotes "the shortest distance between positions iter, jter"
    IMPORTANT_POSITIONS_LENGTH = len( importantPositionsIndexMappedArray )
    shortestDistanceArray2D = [[0 for _ in range( IMPORTANT_POSITIONS_LENGTH )]
                                  for _ in range( IMPORTANT_POSITIONS_LENGTH )]
    
    for iter in range ( IMPORTANT_POSITIONS_LENGTH ) :   
         
        for jter in range ( IMPORTANT_POSITIONS_LENGTH ) :
            
            shortestDistanceArray2D[iter][jter] = getShortestDistance(
                operationAreaSize, hazardPositions,
                importantPositionsIndexMappedArray[iter],
                importantPositionsIndexMappedArray[jter])
        
        shortestDistanceArray2D[iter][iter] = INF



    traversalOrder = deque()
    
    traversalOrderByIndex = getTraversalOrderFromDistanceArray2D( shortestDistanceArray2D, 0 )
    for iter in range (1, len(traversalOrderByIndex)) :
        idx = traversalOrderByIndex[iter]
        traversalOrder.append( importantPositionsIndexMappedArray[idx] )
    
    return traversalOrder


# Code Edited -----------------------------------------

def bfs(operationAreaSize, robotPosition, hazardPositions, importantPositions):
    return getTraversalOrder(operationAreaSize, robotPosition, hazardPositions, importantPositions)

# Example usage:
#hazardPos = [(1, 1), (2, 2), (3, 3),(4,4), (5,5), (6,6), (7,7)]
#importPos = [(1, 2), (2, 1), (3, 4), (7,9), (8,1), (1,8)]
##opsize = (9, 9)
startPos = (0, 0)


def find_path(opsize, startPos, hazardPos, desPos):
    queue = deque([(startPos, [])])  # 큐에는 현재 위치와 이동 경로를 함께 저장
    visited = set()

    while queue:
        current_pos, path = queue.popleft()
        x, y = current_pos

        if (x, y) == desPos:
            return path + [(x, y)]  # 목표 지점에 도달하면 경로 반환

        for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
            next_x, next_y = x + dx, y + dy

            if is_valid2(next_x, next_y, opsize, hazardPos, visited):
                visited.add((next_x, next_y))  # 방문한 위치 기록
                queue.append(((next_x, next_y), path + [(x, y)]))
#            else:
#                print(f"다음 위치 ({next_x}, {next_y})는 유효하지 않습니다.")
    
    return None  # 목표 지점에 도달할 수 없는 경우

def mer(opsize, startPos, hazardPos, importPos):
    order = bfs(opsize, startPos, hazardPos, importPos.copy())
#    print(order)
#    print("/////order/////")
    result = []
    
    while order:
        if result:
            result.pop()
            
        next_pos = order.popleft()
        path = find_path(opsize, startPos, hazardPos, next_pos)
#        print(path)

        if path:
            result += path
            startPos = next_pos  
        else:
            print(f"Cannot find path to import position {next_pos}")

    return result

    
#temp = mer(opsize, startPos, hazardPos, importPos)
#print((temp))