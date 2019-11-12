class BankAccount:
    def __init__(self, name, balance, currency):
        if balance < 0:
            raise ValueError("Account balance is negative")
        self._name = name
        self._balance = balance
        self._currency = currency
        self._history = list()
        self._history.append(f"Account is created, with inital balance of: \
{self._balance} {self._currency}")
        # f"Hello, {name}"

    def name(self):
        return self._name

    def balance(self):
        return self._balance

    def currency(self):
        return self.currency

    def deposit(self, amount):
        if amount < 0:
            raise ValueError("The deposit is negative")
        self._balance += amount
        self._history.append("Deposited :" + str(amount))

    def withdraw(self, amount):
        if amount < 0:
            raise ValueError("The amount to withdraw is negative")
        if amount > self._balance:
            self._history.append(f"Attempted to whithdraw : {amount} FAILED")
            return False
        else:
            self._balance -= amount
            self._history.append(f"Attempted to whithdraw : {amount} \
SUCCSESSFUL")
            return True

    def __str__(self):
        self._history.append(f"Displayed bank account info")
        return f"Bank account for {self._name} with balance of \
                {self._balance} {self._currency}"

    def __int__(self):
        self._history.append("Ballance accessed")
        return self._balance

    def transfer_to(self, account, balance):
        if self._currency != account.currency():
            self._history.append(f"Transfare from: {self._name} to: {account.name()} \
FAILED! Reason: Mistmatched currencies")
            return False
        else:
            if self._balance < balance:
                self._history.append(f"Transfare from: {self._name} to: {account.name()} \
FAILED! Reason: Insuficient funds")
                return False
            else:
                self.withdraw(balance)
                account.deposit(balance)
                self._history.append(f"Transfare from: {self._name}to: \
                                    {account.name()} SUCCSESSFUL!")
                return True

    def history(self):
        print("The history of the account " + self._name + "\n{")
        for entry in self._history:
            print(entry)
        print("}")


account = BankAccount("Rado", 0, "$")


print(account)

account.deposit(1000)

print(account.balance())

print(str(account))

print(int(account))

account.history()

account.withdraw(500)

print(account.balance())

account.history()

account.withdraw(1000)

print(account.balance())

account.history()

rado = BankAccount("Rado", 1000, "BGN")

ivo = BankAccount("Ivo", 0, "BGN")

rado.transfer_to(ivo, 500)

print(rado.balance())
print(ivo.balance())

rado.history()

ivo.history()
