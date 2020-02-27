from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

from post.models import Post


class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    content = models.CharField(max_length=300)
    date = models.DateTimeField(default=datetime.now)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    def __str__(self):
        return f'Comment {self.pk} on {self.post} by {self.author}'


class Reply(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)

    content = models.CharField(max_length=300)
    date = models.DateTimeField(default=datetime.now)
