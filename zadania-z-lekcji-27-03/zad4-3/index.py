def removeToGetHolidayWord(words):
    for word in words:
        if not word:
            return 0
        if word == "wakacje":
            return 0
        char_count = {}
        for char in word:
            if char in char_count:
                char_count[char] += 1
            else:
                char_count[char] = 1
        
        min_count = float('inf')
        for char in "wakacje":
            if char in char_count:
                min_count = min(min_count, char_count[char])
            else:
                return len(word)
        
        return len(word) - min_count
    
with open('../input/slowa.txt', 'r') as file:
    words = file.read().split()
    print(removeToGetHolidayWord(words))