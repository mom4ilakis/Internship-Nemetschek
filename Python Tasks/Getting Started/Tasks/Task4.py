def counts(array):
    numEven = 0
    for i in array:
        if(type(i) == int or type(i) == float):
            if(i%2 == 0):
             numEven += 1
        else:
            return -1
    return numEven
           
print(counts([1,2,3,4,5,6]))
