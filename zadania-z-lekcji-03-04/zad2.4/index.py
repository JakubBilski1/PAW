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

def hex_to_binary(hex_number):
    hex_to_bin_dict = {
        '0': '0000', '1': '0001', '2': '0010', '3': '0011',
        '4': '0100', '5': '0101', '6': '0110', '7': '0111',
        '8': '1000', '9': '1001', 'A': '1010', 'B': '1011',
        'C': '1100', 'D': '1101', 'E': '1110', 'F': '1111'
    }
    
    binary_number = ''
    for digit in hex_number:
        binary_number += hex_to_bin_dict[digit.upper()]
    
    return binary_number

def xor_algorithm(input1, input2):
    max_length = max(len(input1), len(input2))
    input1 = input1.zfill(max_length)
    input2 = input2.zfill(max_length)
    
    result = ""
    for i in range(max_length):
        if input1[i] == input2[i]:
            result += '0'
        else:
            result += '1'
    
    return result

fNum = xor_algorithm(decimalToBinary(123), '101101')
sNum = hex_to_binary('2D')
binRes = xor_algorithm(fNum, sNum)
result = binaryToDecimal(binRes)
print(result)