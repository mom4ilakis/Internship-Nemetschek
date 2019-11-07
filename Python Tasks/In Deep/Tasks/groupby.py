def groupby(func, seq):

    group = dict()
    for obj in seq:
        key = str(func(obj))
        if not key in group:
            group[key] = list()

        group[key].append(obj)
    return group


print(groupby(lambda x: x % 2, [0, 1, 2, 3, 4, 5, 6, 7]))
