Dive into Python
========================

Code the solutions to the following problems :)


## triangle_type
----------------
Напишете функция triangle_type, която приема като аргумент страните на триъгълник и връща като разултат типа на триъгълника:

- равностранен
- равнобедрен
- разностранен

```python
def triangle_type(a, b, c):
    # code here ...

>>> triangle_type(1, 1, 1)
равностранен

>>> triangle_type(1,41, 1,41, 2)
равнобедрен

>>> triangle_type(3, 4, 5)
разностранен
```

## Палиндроми
-----------
Да се напише функция, която приема 2 думи и проверява дали са палиндроми. Палиндром е дума, която прочетена от ляво на дясно и от дясно на ляво са еднакви.
Думата "невен" е палиндром.


## Are two words anagrams?
----------------

For anagrams, check here - https://en.wikipedia.org/wiki/Anagram

For example, `listen` and `silent` are anagrams.

The program should read two words from the standard input and output:

* `ANAGRAMS` if the words are anagrams of each other
* `NOT ANAGRAMS` if the two words are not anagrams of each other

**Consider lowering the case of the two words since the case does not matter. `SILENT` and `listen` are also anagrams.**

## Examples
---

Input:

```
TOP_CODER COTO_PRODE
```

Output:

```
NOT ANAGRAMS
```

---

Input:

```
kilata cvetelina_yaneva
```

Output:

```
NOT ANAGRAMS
```

Also, should not make songs together.

---

Input:

```
BRADE BEARD
```

Output:

```
ANAGRAMS
```


##  Броят на четните числа от всички в даден списък
----------------
Дефинирайте функция `evens_count`, която приема като аргумент списък от цели числа и връща като резултат броя четни числа в него.

```python
>>> events_count([1, 2, 4])
2
```

## Брой на срещания на дадена дума в списък от думи
----------------
Дефинирайте функция `words_count`, която приема като аргумент списък от думи и дума, и връща колко пъти се среща думата в списъка.

```python
>>> words_count(['list', 'python', 'word'], 'word')
1
```

## Counting substrings
----------------

Implement the function `count_substrings(haystack, needle)`. It returns the count of occurrences of the string `needle` in the string `haystack`.

__Don't count overlapped substings and take case into consideration!__
For overlapping substrings, check the "baba" example below.

```python
def count_substrings(haystack, needle):
    pass
```

### Test examples

```python
>>> count_substrings("This is a test string", "is")
2
>>> count_substrings("babababa", "baba")
2
>>> count_substrings("Python is an awesome language to program in!", "o")
4
>>> count_substrings("We have nothing in common!", "really?")
0
>>> count_substrings("This is this and that is this", "this")  # "This" != "this"
2
```


# Речници
----------------
От зададен интервал да се изведе речник, съдържащ двойки ключ:стойност, където ключът е пореден елемент от интервала, а стойността е остатъкът при деление на 5 на същия този елемент:
```python
function(3,5) --> {3:2, 4:1, 5:0}
```


## Library
----------------

Представете си, че трябва да напишем програма за работа с книги.
Тя има следните операции:
- добавяне на книга
- разглеждане на всички книти
- търсене на книга по име, жанр или автор
- изтриване на книги

По какъв начин бихме представили книгите?
Книгите са много - следователно трябва да са в списък.
Каква информация ще имаме за всяка книга?
- Име
- Автор
- Година на публикуване
- Брой страници
- Жанр
- ... много други атрибути

Най-лесният начин е да запазим данните за всяка книга като речник.


```python
books = [
    {
        "title": "Python Tricks: A Buffet of Awesome Python Features",
        "author": "Dan Bader",
        "genre": "programming Python",
        "detail": {
            "publication_year": 2017,
            "isbn-13": 9781775093305,
            "language": "English",
            "pages": 302
        }
    },
    {
        "title": "Fluent Python: Clear, Concise, and Effective Programming",
        "author": "Luciano Ramalho",
        "genre": "programming Python",
        "detail": {
            "publication_year": 2015,
            "isbn-13": 9781491946008,
            "language": "English",
            "pages": 792
        }
    }
]


def list_books():
    """
    Принтира таблица от книги
    """
    pass


def find_book_by_title(title):
    """
    title - стойността на title
    Връща първата книга с заглавие `title` или None ако няма такава
    """
    pass


def find_book(by_what, value):
    """
    by_what - може да бъде title, author, genre
    value - стойността на title, author или genre
    Връща списък от намерени книги
    """
    pass
```

