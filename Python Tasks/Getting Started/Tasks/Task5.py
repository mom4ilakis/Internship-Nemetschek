
def words_count(stringArray, word):
    num_seen = 0
    for str in stringArray:
        if(word == str):
            num_seen += 1
    return num_seen


print(words_count(['list', 'python', 'word', 'word', 'word', 'word', 'word'], 'ord'))
