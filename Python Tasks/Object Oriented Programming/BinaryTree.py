import random


class BinaryTree:
    class Node:
        def __init__(self, data=None, left_child=None, right_child=None):
            self.data = data
            self.left_child = left_child
            self.right_child = right_child

    def __init__(self):
        self.root = None

    def insert(self, data):
        if self.root is None:
            self.root = BinaryTree.Node(data)
            return

        tmp = self.root

        while tmp:
            if data <= tmp.data:
                if tmp.left_child is None:
                    tmp.left_child = BinaryTree.Node(data)
                    return
                else:
                    tmp = tmp.left_child
            else:  # data > tmp.data
                if tmp.right_child is None:
                    tmp.right_child = BinaryTree.Node(data)
                    return
                else:
                    tmp = tmp.right_child

    def in_order(self, root):
        if root is None:
            return

        self.in_order(root.left_child)

        print(root.data)

        self.in_order(root.right_child)

    def post_order(self, root):
        if root is None:
            return

        self.post_order(root.right_child)

        print(root.data)

        self.post_order(root.left_child)

    def print_sorted_inc(self):
        self.in_order(self.root)

    def print_sorted_dec(self):
        self.post_order(self.root)


bts = BinaryTree()

for i in range(1, 10):
    bts.insert(random.choice(range(-100, 100)))

# bts.print_sorted_inc()
bts.print_sorted_dec()
