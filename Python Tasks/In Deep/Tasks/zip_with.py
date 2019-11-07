def zip_with(func, *iterables):
    #if iterables is empty
    if len(iterables) == 0:
        yield list()
    #finding the length of the shortest iterable
    shortest = len(iterables[0])
    for obj in iterables:
        if shortest > len(obj):
            shortest = len(obj)
    #list of arguments to unpack for func
    args = list()

    for i in range(0, shortest):
        #clearing argument list
        args.clear()
        for obj in iterables:
            args.append(obj[i])
        yield func(*args)


def concat3(x, y, z):
    return x + y + z


first_names = ['John', 'Miles'] 
last_names = ['Coltrane', 'Davis'] 
spaces = [' '] * 2

print(list(zip_with(concat3, first_names, spaces, last_names)))








