def binary_blocks(n):
    blocks = 0
    currentBlock = None
    for digit in n:
        digit = digit.replace('\n', '')
        if digit == '1':
            if currentBlock == '0' or currentBlock is None:
                blocks += 1
                currentBlock = '1'
        else:
            if currentBlock == '1' or currentBlock is None:
                blocks += 1
                currentBlock = '0'
    return blocks

with open('../input/bin.txt') as file:
    data = file.readlines()
    count = 0
    for line in data:
        result = binary_blocks(line)
        if(result <= 2):
            count += 1
    
    print(count)