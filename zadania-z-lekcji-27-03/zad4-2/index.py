def wakacjeWords(words):
    result = []
    letters = {'w': 1, 'a': 2, 'k': 1, 'c': 1, 'j': 1, 'e': 1}
    for word in words:
        counts = {letter: word.count(letter) for letter in letters.keys()}
        counts['a'] //= 2
        result.append(min(counts.values()))
    return result


with open('../input/slowa.txt', 'r') as file:
    words = file.read().split()
    result = wakacjeWords(words)
    with open('./output/wyniki4_2.txt', 'w') as file:
        for num in result:
            file.write(f'{num} ')