
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
    },
    {
        "title": "1984",
        "author": "G.Ourwell",
        "genre": "	Dystopian",
        "detail": {
            "publication_year":1949,
            "isbn-13": 123456789,
            "language": "English",
            "pages": 328
        }       
        }

]


def list_books():
    
    for b in books:
       for k, v in b.items():
         if isinstance(v,dict):
             for k1,v1 in v.items():
                 print(k1,":",v1)
         else:
             print(k,":",v)
       print()


     
def find_book_by_title(title):

    for book in books:
        if book["title"] == title:
            return book

    return "None"

def find_book(by_what,value):
    
    return [book for book in books if book[by_what] == value]


print(find_book_by_title("Python Tricks: A Buffet of Awesome Python Features"))

print(find_book("genre","programming Python"))



