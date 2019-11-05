
def words_count(stringArray, word):
    numSeen=0
    for str in stringArray:
        if(word == str):
         numSeen+=1
    return numSeen



print(words_count(['list', 'python', 'word','word','word','word','word'], 'ord'))