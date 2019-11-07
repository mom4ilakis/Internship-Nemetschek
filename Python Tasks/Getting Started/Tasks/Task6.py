def count_substrings(haystack, needle):
    if(len(haystack) < len(needle)):
        return 0

    earlyExit = False
    count = 0
    haystack_index = 0
    while(haystack_index < len(haystack) - len(needle)+1):
        if(haystack[haystack_index] == needle[0]):
            earlyExit = False
            for y in range(1, len(needle)):
                if(haystack[haystack_index+y] != needle[y]):
                    earlyExit = True
                    break
            if(not earlyExit):
                count += 1
                haystack_index += (len(needle)-1)
        haystack_index += 1
    return count


print(count_substrings("This is a test string", "is"))

print(count_substrings("babababa", "baba"))

print(count_substrings("Python is an awesome language to program in!", "o"))

print(count_substrings("We have nothing in common!", "really?"))

print(count_substrings("This is this and that is this", "this"))
