def binary_blocks(n):
    converted = bin(n)[2:]
    blocks = 0
    currentBlock = None
    for digit in converted:
        if digit == '1':
            if currentBlock == '0' or currentBlock is None:
                blocks += 1
                currentBlock = '1'
        else:
            if currentBlock == '1' or currentBlock is None:
                blocks += 1
                currentBlock = '0'
    return blocks


test1 = 67
test2 = 245

print(binary_blocks(test1))
print(binary_blocks(test2))