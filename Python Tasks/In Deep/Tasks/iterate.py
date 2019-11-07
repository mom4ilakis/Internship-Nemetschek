def compose(f, g):
    return lambda x: f(g(x))


def iterate(function):
    f = indenity
    while True:
        yield f
        f = compose(function, f)


def double(x):
    return 2*x


def indenity(f):
    return f


i = iterate(double)

f = next(i)
print(f(3))
