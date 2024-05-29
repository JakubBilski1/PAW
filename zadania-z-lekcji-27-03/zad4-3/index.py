def remove_to_get_vacation_word(word):
    removals = []
    length = len(word)
    removals.append(length)
    vacation = list('wakacje')
    letter = 0
    cut = 0
    for i in range(len(word)):
        if word[i] == vacation[letter]:
            if letter == len(vacation) - 1:
                removals.append(len(word) - i - 1 + cut)
                letter = -1
            letter += 1
        else:
            cut += 1
    return min(removals)

input_file_path = "../input/przyklad.txt"
output_file_path = "./output/wyniki4_3.txt"

with open(input_file_path, "r") as input_file, open(output_file_path, "w") as output_file: 
    words = input_file.read().splitlines()
    for word in words:
        min_removals = remove_to_get_vacation_word(word)
        result = f"{min_removals} "
        output_file.write(result)
