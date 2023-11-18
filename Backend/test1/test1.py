from collections import deque

def is_valid(x, y, opsize):
    return 0 <= x < opsize[0] and 0 <= y < opsize[1]

def is_valid2(x, y, opsize, hazardPos, visited):
    opwidth, opheight = opsize
    return 0 <= x < opwidth and 0 <= y < opheight and (x, y) not in hazardPos and (x, y) not in visited

def bfs(opsize, startPos, hazardPos, importPos):
    visited = set()
    queue = deque([startPos])  # current_pos만 큐에 저장
    import_queue = deque()  # importPos 방문 순서를 저장하는 큐

    while queue:
        current_pos = queue.popleft()

        if current_pos not in visited:
            visited.add(current_pos)

            if current_pos in importPos:
                importPos.remove(current_pos)
                import_queue.append(current_pos)
                #print(f"Visited importPos at {current_pos}")

            x, y = current_pos

            for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                next_pos = (x + dx, y + dy)

                if is_valid(*next_pos, opsize) and next_pos not in hazardPos and next_pos not in visited:
                    queue.append(next_pos)

    #print("All importPos visited.")
    return import_queue

# Example usage:
hazardPos = [(1, 1), (2, 2), (3, 3),(4,4), (5,5), (6,6), (7,7)]
importPos = [(1, 2), (2, 1), (3, 4), (7,9), (8,1), (1,8)]
opsize = (9, 9)
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

    

    
print(mer(opsize, startPos, hazardPos, importPos))
