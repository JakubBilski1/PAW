def binaryToDecimal(binary):
    decimal = 0
    revBinary = binary[::-1]
    for i in range(len(revBinary)):
        if revBinary[i] == '1':
            decimal += 2**i
        else:
            pass
    return decimal

def decimalToBinary(decimal):
    binary = ''
    while decimal > 0:
        binary += str(decimal % 2)
        decimal = decimal // 2

    return binary[::-1]

def getMax(tab):
    maxBin = 0
    for i in range(len(tab)):
        tab[i] = binaryToDecimal(tab[i])
        if(tab[i] > maxBin):
            maxBin = tab[i]
        else:
            pass
    result = decimalToBinary(maxBin)
    return result

with open("../input/bin.txt") as file:
    data = file.readlines()
    data = [line.replace('\n', '') for line in data]
    print(getMax(data))