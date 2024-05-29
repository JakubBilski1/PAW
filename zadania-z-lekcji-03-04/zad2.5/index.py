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

def xor_algorithm(input1, input2):
    input1 = str(input1)
    input2 = str(input2)
    input1 = decimalToBinary(int(input1))
    input2 = decimalToBinary(int(input2))
    max_length = max(len(input1), len(input2))
    input1 = input1.zfill(max_length)
    input2 = input2.zfill(max_length)

    result = ""
    for i in range(max_length):
        if input1[i] == input2[i]:
            result += "0"
        else:
            result += "1"

    return result


def xor_div2(p):
    return xor_algorithm(p, (p // 2))


with open("../input/bin.txt", "r") as file:
    binary_numbers = file.readlines()

    with open("./wyniki2_5.txt", "w") as output_file:
        for binary_number in binary_numbers:
            # Konwersja binarnej liczby na liczbę całkowitą
            p = int(binary_number.strip(), 2)
            # Obliczenie wyniku
            result = xor_div2(p)
            # Konwersja wyniku na postać binarną i zapis do pliku
            output_file.write(f"{result}\n")
