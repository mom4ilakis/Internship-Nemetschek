
import time


def accepts(*types):
    def get_funct(func):
        def wrapper(*args, **kwargs):
            for(a, t) in zip(args, types):
                if not isinstance(a, t):
                    raise TypeError("Type missmatch")
            return func(*args, **kwargs)
        return wrapper
    return get_funct


@accepts(str)
def print_greeting(arg):
    print(arg)


@accepts(str, int)
def make_deposit(name, amount):
    print("{} deposied {}$!".format(name, amount))


print_greeting("Hello World")
#print_greeting(0)

make_deposit("Pesho", 10000)


def cypher(shift_pos):
    def get_funct(func):
        def wrapper(*args, **kwargs):

            str_res = func(*args, **kwargs)

            sec_res = ""

            for letter in str_res:
                new_letter = chr(ord(letter) + shift_pos)
                sec_res += str(new_letter)

            return sec_res
        return wrapper
    return get_funct


def log(file_name):
    def get_funct(func):
        def wrapper(*args, **kwargs):
            output_file = open(file_name, "w")
            output_file.write(func(*args, **kwargs))
            output_file.close()
        return wrapper
    return get_funct


@log("log.txt")
@cypher(2)
def get_low():
    return "Get get get low"


def perfomance(file):
    def get_func(func):
        def wrapper(*args, **kwargs):
            s_time = time.perf_counter()
            val = func(*args, **kwargs)
            f_time = time.perf_counter()
            r_time = f_time - s_time
            log_file = open(file, "a")
            log_file.write(str(r_time))

            return val
        return wrapper
    return get_func

@perfomance("per_log_1.txt")
def heavy():
    for i in range(1, 10000000):
        i*i
    print("Done!")


heavy()
