def anagrams(string1, string2):
   
    if(len(string1) != len(string2)):
        print("NOT ANAGRAMS")
        return
    s1 = string1.lower()
    s2 = string2.lower()
    if(sorted(string1) == sorted(string2)):
        print("ANAGRAMS")
    else:
        print("NOT ANAGRAMS")

anagrams("TOP_CODER", "COTO_PRODE")
anagrams("kilata","cvetelina_yaneva")
anagrams("BRADE","BEARD")
