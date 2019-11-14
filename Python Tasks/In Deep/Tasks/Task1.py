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


class Pred:
    def __init__(self, pred):
        self.pred = pred

    def __and__(self, pred1):
        return Pred(self.pred and pred1)

    def __or__(self, pred1):
        return Pred(self.pred or pred1)

    def __invert__(self):
        return Pred(not self.pred)

    def __rshift__(self, pred1):
        return Pred(~self.pred or pred1)

    def __call__(self, *args, **kwargs):
        return self.pred(*args, **kwargs)


positive = Pred(gt(0))
negative = Pred(lt(0))
zero = Pred(eq(0))
less_than_41 = Pred(lt(41))
less_than_40 = Pred(lt(40))
greater_than_41 = Pred(gt(41))


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
