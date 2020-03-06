from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Author


@admin.register(Author)
class AuthorAdmin(UserAdmin):
    model = Author
    list_display = ['id', 'username', 'email', 'first_name', 'last_name', 'avatar']
    readonly_fields = ['id']
    ordering = ['-id']
