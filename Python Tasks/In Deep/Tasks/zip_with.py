def zip_with_map(func, *iterables):
    yield list(map(func, *iterables))


def concat3(x, y, z):
    return x + y + z


def concat_many(*args):
    res = ""
    for a in args:
        res += a
    return res


first_names = ['John', 'Miles']
last_names = ['Coltrane', 'Davis']
spaces = [' '] * 2

print(list(zip_with_map(concat_many, first_names, spaces, last_names)))
