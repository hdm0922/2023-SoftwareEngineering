from collections import deque

def is_valid(x, y, opsize):
    return 0 <= x < opsize[0] and 0 <= y < opsize[1]

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
hazardPos = [(1, 1), (2, 2), (3, 3),(4,4), (5,5), (6,6), (8,4)]
importPos = [(1, 2), (2, 1), (3, 4), (7,9), (8,1), (1,8)]
opsize = (9, 9)
startPos = (0, 0)

import_order = bfs(opsize, startPos, hazardPos, importPos)
#print("ImportPos Visit Order:")
#print(import_order)

print(import_order)
print(type(import_order))

temp = deque()

def calculatepath(startpos = (0,0)  , hazardpos=[] ,order = deque(), storge=deque()):
    x = startpos[0]
    y = startpos[1]
    print(x)
    print(y)
    
calculatepath((1,3))