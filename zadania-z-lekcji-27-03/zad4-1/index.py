def wkWords(words):
    wkWords = []
    for word in words:
        wCount = 0
        kCount = 0
        for char in word:
            if char == 'w':
                wCount += 1
            elif char == 'k':
                kCount += 1
        if wCount == kCount:
            wkWords.append(word)
    return wkWords

with open('../input/slowa.txt', 'r') as file:
    words = file.read().split()
    result = wkWords(words)
    with open('./output/wyniki4_1.txt', 'w') as output:
        for word in result:
            output.write(word + '\n')