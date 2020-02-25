import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User

from datetime import date
from author.models import Author
from post.models import Post
from comment.models import Comment


@pytest.fixture
def anon_client():
    return APIClient()


@pytest.fixture
def author():
    author = Author(username='test_user', password='123456', avatar='none')
    author.save()
    return author


@pytest.fixture
def user():
    user = User.objects.create(username='test_user', password='123456')
    user.save()
    return user


@pytest.fixture
def post(author):
    post = Post(title='title', content='content', cover='cvr',
                date=date.today(), author=author)
    post.save()
    return post


@pytest.fixture
def client(author):
    client = APIClient()
    client.force_authenticate(user=author)
    return client


@pytest.fixture
def comment(post, author):
    comment = Comment(author=author, post=post, content='comment')
    comment.save()
    return comment


@pytest.mark.django_db
def test_get_no_comment(client):
    result = client.get('/comments/1/')
    assert result.status_code == 404


@pytest.mark.django_db
def test_make_comment(client, post, author):
    result = client.post('/comments/', {
        'author': author.pk,
        'post': post.pk,
        'content': 'new content',
    })
    assert result.status_code == 201


@pytest.mark.django_db
def test_get_comment(client, comment):
    result = client.get(f'/comments/{comment.pk}/')
    assert result.status_code == 200
    assert result.data == {
        'content': comment.content,
        'post': comment.post.pk,
        'date': str(comment.date),
        'author': comment.author.pk,
    }


@pytest.mark.django_db
def test_post_comment_no_auth(post, anon_client):
    result = anon_client.post('/comments/', {
        'post': post.pk,
        'content': 'new content',
    })
    assert result.status_code == 401


@pytest.mark.django_db
def test_post_comment_no_author(post, client):
    result = client.post('/comments/', {
        'post': post.pk,
        'content': 'new content',
    })
    assert result.status_code == 201


@pytest.mark.django_db
def test_post_comment_no_post(client):
    result = client.post('/comments/', {
        'content': 'new content'
    })
    assert result.status_code == 400