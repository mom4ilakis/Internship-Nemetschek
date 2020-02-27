from django.db import models
from django.contrib.auth.models import User


class Author(User):
    avatar = models.CharField(max_length=300)

    def __str__(self):
        return f"<Author username={self.username} email={self.email}>"
