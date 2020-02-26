from django.db import models
from author.models import Author
from datetime import datetime


class Post(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    title = models.CharField(max_length=160)
    cover = models.CharField(max_length=200)
    content = models.TextField(max_length=1000)
    date = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.title
