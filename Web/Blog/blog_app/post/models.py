from django.db import models
from author.models import Author


class Post(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    title = models.CharField(max_length=160)
    cover = models.CharField(max_length=200)
    content = models.TextField(max_length=1000)
    date = models.DateField()

    def __str__(self):
        return self.title

