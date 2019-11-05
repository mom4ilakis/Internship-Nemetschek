def createDic(start, finish):
     d =  dict()
     for i in range(start, finish+1):
         d[i] = i%5
     return d

print(createDic(3,5))
