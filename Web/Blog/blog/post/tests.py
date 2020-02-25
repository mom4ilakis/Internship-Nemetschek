import pytest
from datetime import date
from rest_framework.test import APIClient

from post.models import Post
from author.models import Author


@pytest.fixture
def anon_client():
    return APIClient()


@pytest.fixture
def author():
    author = Author(username='test_user', password='123456', avatar='none')
    author.save()
    return author


@pytest.fixture
def client(author):
    client = APIClient()
    client.force_authenticate(user=author)
    return client


@pytest.fixture
def post(author):
    return Post.objects.create(title="Title", content="Content", cover="cover",
                               author=author, date=date.today())


@pytest.mark.django_db
def test_no_posts(anon_client):
    result = anon_client.get('/posts/')
    assert result.data == []


@pytest.mark.django_db
def test_create_post(client, post):
    result = client.post('/posts/', {
        'title': 'title',
        'content': 'content',
        'cover': 'cvr'
    },
        format='json'
    )

    assert result.status_code == 201
    # assert result.data


@pytest.mark.django_db
def test_create_post_invalid_user(anon_client):
    result = anon_client.post('/posts/',
                              {
                                "title": "wrong title",
                                "content": "free",
                                "cover": "cvr"
                              })
    assert result.status_code == 401


@pytest.mark.django_db
def test_get_listposts(client):
    result = client.get('/posts/')

    assert result.status_code == 200


@pytest.mark.django_db
def test_get_existing_post(client, post):
    result = client.get(f'/posts/{post.pk}/')
    assert result.status_code == 200
    assert result.data == {
        'title': post.title,
        'content': post.content,
        'cover': post.cover,
        'date': str(post.date),
        'author': post.author.pk
    }


@pytest.mark.django_db
def test_get_non_existing_post(client):
    result = client.get('/post/1/')
    assert result.status_code == 404


@pytest.mark.django_db
def test_delete_existing_post(client, post):
    result = client.delete(f'/posts/{post.pk}/')
    assert result.status_code == 204


@pytest.mark.django_db
def test_delete_non_existing_post(client):
    result = client.delete('/posts/1/')
    assert result.status_code == 404


@pytest.mark.django_db
def test_get_post_non_auth_user(anon_client, client, post):
    result = anon_client.get(f'/posts/{post.pk}/')
    assert result.status_code == 200
    result.data == {
        'title': post.title,
        'content': post.content,
        'cover': post.cover,
        'date': str(post.date),
        'author': post.author.pk
    }


@pytest.mark.django_db
def test_update_non_auth_user(anon_client, client, post):
    result = anon_client.patch(f'/posts/{post.pk}/', {
        "title": "new title"
    })
    assert result.status_code == 401
