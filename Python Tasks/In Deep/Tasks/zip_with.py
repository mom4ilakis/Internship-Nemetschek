def zip_with(func, *iterables):
    # if iterables is empty
    if len(iterables) == 0:
        yield list()
    # finding the length of the shortest iterable
    shortest = len(min(iterables, key=len))
    # list of arguments to unpack for func
    args = list()

    for i in range(0, shortest):
        # clearing argument list
        args.clear()
        for obj in iterables:
            args.append(obj[i])
        yield func(*args)


def concat3(x, y, z):
    return x + y + z


def concat_many(*args):
    res = ""
    return [res + i for i in args]


first_names = ['John', 'Miles', "Doe"]
last_names = ['Coltrane', 'Davis']
spaces = [' '] * 2

print(list(zip_with(concat_many, first_names, spaces, last_names)))
