def isPalindrome(string1):
    for i in range(1, len(string1)):
        if(string1[i-1] != string1[-i]):
            return False
    return True


print(isPalindrome("abccba"))
print(isPalindrome("abcba"))
