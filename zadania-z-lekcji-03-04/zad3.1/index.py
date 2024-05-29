def count_fragments_over_90(pi_digits):
    count = 0
    for i in range(len(pi_digits)-1):
        fragment = f"{pi_digits[i]}{pi_digits[i+1]}"
        fragment = int(fragment)
        if fragment > 90:
            count += 1
    return count

with open("../input/pi.txt", "r") as file:
    arr = []
    pi_digits = file.readlines()
    for line in pi_digits:
        arr.append(line.strip())
    print(count_fragments_over_90(arr))