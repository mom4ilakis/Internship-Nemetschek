
class DoubleLinkedList:
    class Node:
        def __init__(self, prev=None, next=None, data=None):
            self.prev = prev
            self.next = next
            self.data = data

        def next(self):
            return self.next

        def prev(self):
            return self.prev

        def data(self):
            return self.data

    # List can be iterated
    def __iter__(self):
        # the currnet element, starting with the head
        tmp = self.head

        while tmp:
            # yields the currnet element from the list
            yield tmp
            # next element in the list
            tmp = tmp.next

    def __init__(self):
        self.head = DoubleLinkedList.Node()
        self.tail = self.head
        self.size = 0

    def empty(self):
        return self.size == 0

    def front(self):
        return self.head

    def back(self):
        return self.tail

    # adding data to the front of the list
    def push_front(self, data):

        if self.empty():
            self.head = DoubleLinkedList.Node(None, None, data)
            self.tail = self.head
        else:
            # saving the currnet head
            tmp = self.head
            # creating the new head of the list
            self.head = DoubleLinkedList.Node(None, tmp, data)
            # adding the prev Node to last head
            tmp.prev = self.head
            # increasing the size of the list
        self.size += 1

    # adding data to the end of the list
    def push_back(self, data):

        if self.empty():
            # reuse the code for adding to the front,
            self.push_front(data)
        else:
            # saving the current tail to temp var
            tmp = self.tail
            # creating the new tail
            self.tail = DoubleLinkedList.Node(tmp, None, data)
            # setting the next Node for the prev tail
            tmp.next = self.tail
            # increasing the size of the list
        self.size += 1

    # removes the first element from the list
    def pop_front(self):

        if self.empty():
            raise IndexError("Pop_front failed, the list is empty")

        # the new head of the list
        self.head = self.head.next()

        self.size -= 1

    # removes the last element of the list
    def pop_back(self):

        if self.empty():
            raise IndexError("Pop_back failed, the list is empty")

        tmp = self.tail
        # the new tail of the list
        self.tail = self.tail.prev()

        del tmp

        self.size -= 1

    def search(self, data):

        index = 0
        # if the list is empty
        if self.empty():
            return None

        tmp = self.head

        # searching for the element
        while tmp:
            if tmp.data == data:
                return index
            tmp = tmp.next
            index += 1

        # if the element is not in the list
        return None

    def sorted(self):
        # using the included sort function, passing a custom key
        return sorted(self, key=lambda obj: obj.data)


# testing the implementation
test_list = DoubleLinkedList()

# test_list.pop_back()

for i in range(1, 200):
    if i % 2 == 0:
        test_list.push_back(i)
    else:
        test_list.push_front(i)

# print(test_list.search(55))

sorted_list = test_list.sorted()

# print(test_list.search(55))

for obj in sorted_list:
    print(obj.data)
