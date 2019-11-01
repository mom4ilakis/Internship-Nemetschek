# Object Oriented programming in Python :)


## Свързан линеен списък
----------------
[Linked List Data Structure](https://www.geeksforgeeks.org/data-structures/linked-list/)

Да се проектира структура от данни двусвързан линеен списък
- Всеки елемент е инстанция на клас
- Да се реализират основните операции за работа с двусвързан линеен списък.


## Binary Trees

- A
[Binary Tree](https://en.wikipedia.org/wiki/Binary_tree)
Да се напише програма, която извежда всички положителни, а след това и всички отрицателни стойности от върховете на дадено двоично дърво.

- B
Да се напише програма, която намира сумата на четните стойности от върховете на дадено двоично дърво.



# A Bank Account

 `BankAccount` class, which behaves like that:

## Basic BankAccount usage

Our `BankAccount` will have the following methods:

* Constructor takes a `name` for the account, initial `balance` and a `currency`. If `balance` is negative number, raise an `ValueError` error.
* `deposit(amount)` - deposits money of `amount` to your balance. If `amount` is negative number, raise an `ValueError` error.
* `balance()` - returns the current balance
* `withdraw(amount)` - takes `amount` money from the account. Returns `True` if it was successful. Otherwise, `False`
* `__str__` should print: `"Bank account for {name} with balance of {amount}{currency}"`
* `__int__` should return the balance of the `BankAccount`
* `transfer_to(account, amount)` - transfers `amount` to `account` if they both have the same currencies! Returns `True` if successful.
* `history()` - returns a list of strings, that represent the history of the bank account. Check examples below for more information.


```python
>>> account = BankAccount("Rado", 0, "$")
>>> print(account)
'Bank account for Rado with balance of 0$'
>>> account.deposit(1000)
>>> account.balance()
1000
>>> str(account)
'Bank account for Rado with balance of 1000$'
>>> int(account)
1000
>>> account.history()
['Account was created', 'Deposited 1000$', 'Balance check -> 1000$', '__int__ check -> 1000$']
>>> account.withdraw(500)
True
>>> account.balance()
500
>>> account.history()
['Account was created', 'Deposited 1000$', 'Balance check -> 1000$', '__int__ check -> 1000$', '500$ was withdrawed', 'Balance check -> 500$']
>>> account.withdraw(1000)
False
>>> account.balance()
500
>>> account.history()
['Account was created', 'Deposited 1000$', 'Balance check -> 1000$', '__int__ check -> 1000$', '500$ was withdrawed', 'Balance check -> 500$', 'Withdraw for 1000$ failed.', 'Balance check -> 500$']
```

Also, we should be able to transfer money from one account to another:

```python
>>> rado = BankAccount("Rado", 1000, "BGN")
>>> ivo = BankAccount("Ivo", 0, "BGN")
>>> rado.transfer_to(ivo, 500)
True
>>> rado.balance()
500
>>> ivo.balance()
500
>>> rado.history()
['Account was created', 'Transfer to Ivo for 500BGN', 'Balance check -> 500BGN']
>>> ivo.history()
['Account was created', 'Transfer from Rado for 500BGN', 'Balance check -> 500BGN']
```
