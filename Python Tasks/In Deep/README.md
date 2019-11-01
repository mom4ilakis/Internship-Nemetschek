Напишете миниатюрна библиотека за комбиниране на предикати.

## По-точно

За нашите цели, "предикат" е функция на един аргумент, която връща `True` или `False`. Може да имате фунции, които връщат предикати. Например `gt(x)` е предикат, който "казва" дали аргумента му е по-голям от `x`.

    positive = gt(0)
    positive(10) # True
    positive(-10) # False

Аналогично, `lt(x)`:

    negative = lt(0)
    negative(10) # False
    negative(-10) # True

## Предикати

Имплементирайте следните предикати:

* `gt(x)` -- връща дали аргумента е по-голям (но не и равен) от `x`
* `lt(x)` -- връща дали аргумента е по-малък (но не и равен) от `x`
* `eq(x)` -- връща дали аргумента е равен на `x`
* `oftype(t)` -- връща дали аргумена е от тип `t` (проверява с `instanceof`)
* `present()` -- връща `True`, ако аргумента е различен от `None`
* `pred(function)` -- връща `True`, ако `function` връща истина за обекта

## Комбиниране на предикати

Предикатите могат да се комбинират по няколко начина.

* `a & b` (конюнкция) -- връща `True` за `x`, ако `a(x)` и `b(x)` са `True`
* `a | b` (дизюнкция) -- връща `True` за `x`, ако `a(x)` или `b(x)` е `True`
* `~a` (отрицание) -- връща `True` за `x`, ако `a(x)` е `False`
* `a(x) >> b(x)` (импликация) -- ако `a(x)` е истина, връща `b(x)`; в противен случай -- връща `True`
* `for_any(*predicates)` -- връща `True`, ако поне един от предикатите в `predicates` връща `True` за аргумента
* `for_all(*predicates)` -- връща `True`, ако всички предикати в `predicates` връщат `True` за аргумента

## Примери

    digit = oftype(int) & gt(-1) & lt(10)
    binary = eq(0) | eq(1)
    number = for_any(oftype(int), oftype(float), oftype(complex))
    is_the_empty_string = pred(lambda x: x is "")

## Бележки

* Няма значение дали комбинатори ще оценяват предикати, когато това не нужно. Ако `a(x)` е `False`, то няма значение дали `a(x) & b(x)` ще оцени `b(x)`
* **Задължително изпълнете примерния тест**. В него очакваме да дефинирате и **осемте** предиката -- ако `import`-а се провали, ще имате 0 точки.
* Има много начини, по които тази задача може да се реши. Помислете в кое решение ще бъде най-лесно да се добавя нов предикат.

## Идеи за решение

Няколко различни начина, по които *мислим*, че може да решите задачата.

* Сторете дърво, което да обработвате при изпълнение проверка на предикат
* Направете йерархия, в която всеки предикат да е клас.
* Всеки предикат може да се представи като една ламбда.
* Може да направите функции, които вземат ламба и връщат предикатен клас. Например `gt = make(lambda x, m: x > m)`.


# Decorators

# @accepts
Make a decorator ``accepts`` that takes as many arguments as the function takes. That decorator specify the types of the arguments that your function takes. If any of the arguments does not match the type in the decorator raise a ``TypeError``

## Examples
```python
@accepts(str)
def say_hello(name):
    return "Hello, I am {}".format(name)

say_hello(4)

TypeError: Argument 1 of say_hello is not str!
```

```python
@accepts(str)
def say_hello(name):
    return "Hello, I am {}".format(name)

say_hello("Hacker")
```

```python
@accepts(str, int)
def deposit(name, money):
    print("{} sends {} $!".format(name, money))
    return True

deposit("RadoRado", 10)
```

Note that this is just a nice example. In real life you don't want use this!

# @encrypt(key)

Make a decorator ``encrypt`` that takes an integer. The decorator should encrypts the returned string of a function using the [Caesar Cipher](https://en.wikipedia.org/wiki/Caesar_cipher). That integer is the encryptions key.

## Example

```python
@encrypt(2)
def get_low():
    return "Get get get low"

get_low()

Igv igv igv nqy
```

# @log(file_name)
Make a decorator ``log`` that takes an ``file_name`` and writes in to this file a log. New line for every call of the decorated function.


## Example

```python
@log('log.txt')
@encrypt(2)
def get_low():
    return "Get get get low"

get_low()

Igv igv igv nqy
```

And the log file should look like this:

```
get_low was called at 2015-08-04 02:51:41.929980
get_low was called at 2015-08-04 02:51:45.992980
get_low was called at 2015-08-04 02:51:42.999923
```

# @performance(file_name)
Make a decorator ``performance`` that takes an ``file_name`` and writes in to this file a log. New line for every call of the decorated function. This decorator should log the time needed for the decorated function to execute.

## Example

```python
@performance('log.txt')
def something_heavy():
    sleep(2)
    return "I am done!"

something_heavy()

I am done!
```

And the log file should look like this:

```
get_low was called and took 2.00 seconds to complete
get_low was called and took 2.10 seconds to complete
```
