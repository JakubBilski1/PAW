def czy_rosnaco_malejacy(ciag):
    for i in range(len(ciag) - 1):
        if ciag[i] >= ciag[i+1]

def six_nums_increasing_decreasing(pi_digits):
    count = 0
    for i in range(len(pi_digits)):
        fragment = pi_digits[i:i+6]
        if len(fragment) < 6:
            break
        for i in fragment:
            fragment = list(map(int, fragment))
        print(fragment)
        print(czy_rosnaco_malejacy(fragment))
        if(czy_rosnaco_malejacy(fragment)):
            count += 1
    print(count)
            
            

pi_digits = []
with open("../input/pi_przyklad.txt", "r") as file:
    for line in file:
        pi_digits.extend(line.strip())

six_nums_increasing_decreasing(pi_digits)