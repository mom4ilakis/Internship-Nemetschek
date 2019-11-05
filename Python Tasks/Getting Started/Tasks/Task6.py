def count_substrings(haystack, needle):
    
    if(len(haystack)< len(needle)):
        return 0

    earlyExit = False
    count = 0
    i=0
    while(i<len(haystack)-len(needle)+1):
        if(haystack[i] == needle[0]):
            earlyExit = False
            for y in range(1,len(needle)):
                if(haystack[i+y] != needle[y]):
                    earlyExit = True
                    break
            if(not earlyExit):
                count+=1
                i+=(len(needle)-1)
        i+=1
    return count


print(count_substrings("This is a test string", "is"))

print(count_substrings("babababa", "baba"))

print( count_substrings("Python is an awesome language to program in!", "o"))

print(count_substrings("We have nothing in common!", "really?"))

print(count_substrings("This is this and that is this", "this"))
