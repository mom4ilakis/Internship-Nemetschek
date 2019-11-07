def gt(x):
    return lambda i: i > x


def lt(x):
    return lambda i: i < x


def eq(x):
    return lambda i: i == x


def oftype(t):
    return lambda i: isinstance(i, t)


def present():
    return lambda i: not isinstance(i, None)


positive = gt(0)
negative = lt(0)
zero = eq(0)
less_than_41 = lt(41)
less_than_40 = lt(40)
greater_than_41 = gt(41)


def __and__(pred1):
    return lambda pred2: pred1 and pred2


def __or__(pred1):
    return lambda pred2: pred1 or pred2


def __invert__(pred):
    return lambda: not pred


def __rshift__(pred1):
    return lambda pred2: ~pred1 or pred2


def for_any(*predicates):
    def helper(arg):
        for p in predicates:
            if p(arg):
                return True
        return False
    return helper


def for_all(*predicates):
    def helper(arg):
        for p in predicates:
            if not p(arg):
                return False
        return True
    return helper


print(for_any(positive, negative, zero, less_than_41, less_than_40)(0))

print(for_all(zero, less_than_40, less_than_41)(0))

print(for_all(zero, less_than_40, less_than_41)(1))
