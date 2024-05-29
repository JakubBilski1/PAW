def find_min_max_fragments(digits):
    dictFragments = {f'{i:02}': 0 for i in range(100)}  # Initialize all possible two-digit numbers with count 0
    for i in range(len(digits)-1):
        fragment = f"{digits[i]}{digits[i+1]}"
        if fragment in dictFragments:
            dictFragments[fragment] += 1
    minFragment = min(dictFragments, key=dictFragments.get)
    maxFragment = max(dictFragments, key=dictFragments.get)
    minFragmentCount = dictFragments[minFragment]
    maxFragmentCount = dictFragments[maxFragment]
    return minFragment, maxFragment, minFragmentCount, maxFragmentCount

# Read pi digits from file
pi_digits = []
with open("../input/pi.txt", "r") as file:
    for line in file:
        pi_digits.extend(line.strip())
        
minFragment, maxFragment, minFragmentCount, maxFragmentCount = find_min_max_fragments(pi_digits)
print(f"Min fragment: {minFragment}, count: {minFragmentCount}")
print(f"Max fragment: {maxFragment}, count: {maxFragmentCount}")
