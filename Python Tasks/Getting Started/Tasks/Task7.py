def createDic(start, finish):
    created_dict = dict()
    for i in range(start, finish+1):
        created_dict[i] = i % 5
    return created_dict


print(createDic(3, 5))
