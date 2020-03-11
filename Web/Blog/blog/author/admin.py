from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class AuthorAdmin(UserAdmin):
    model = User
    list_display = ['id', 'username', 'email', 'is_author']
    fieldsets = [
        ['Personal', {
            'fields': ['email', 'first_name', 'last_name']}],
        ['Public', {
            'fields': ['username', 'avatar'],
        }],
        ['Security', {
            'fields': ['id', 'password', 'is_author'],
        }
        ]
    ]
    # fields = ['id', 'username', 'email', 'first_name', 'last_name', 'avatar', 'is_author']
    readonly_fields = ['id']
    ordering = ['-id']
