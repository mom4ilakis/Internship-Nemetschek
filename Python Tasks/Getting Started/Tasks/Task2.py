def isPalindrome (string1, string2):
    checkedPali = True
    for i in range(1,len(string1)):
        if(string1[i-1] != string1[-i]):
            checkedPali = False
            break


    for i in range(1,len(string2)):
        if(string2[i-1] != string2[-i]):
            checkedPali = False
            break

    return checkedPali

print(isPalindrome("abccba","aa"))
print(isPalindrome("abcba","abca"))
