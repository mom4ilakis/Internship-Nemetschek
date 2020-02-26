import pytest
from datetime import datetime



@pytest.mark.django_db
def test_no_posts(anon_client):
    result = anon_client.get('/posts/')
    assert result.data == []


@pytest.mark.django_db
def test_create_post(client, author):
    result = client.post('/posts/', {
        'title': 'title',
        'content': 'content',
        'cover': 'cvr'
    })

    assert result.status_code == 201
    del result.data['date']
    assert result.data == {
        'title': 'title',
        'content': 'content',
        'cover': 'cvr',
        'author': {
            'username': author.username,
            'email': author.email,
            'avatar': author.avatar
        },
    }


@pytest.mark.django_db
def test_create_post_invalid_user(anon_client):
    result = anon_client.post('/posts/', {
        "title": "wrong title",
        "content": "free",
        "cover": "cvr"
    })
    assert result.status_code == 401


@pytest.mark.django_db
def test_list_posts(client):
    result = client.get('/posts/')

    assert result.status_code == 200


@pytest.mark.django_db
def test_get_existing_post(client, post):
    result = client.get(f'/posts/{post.pk}/')
    assert result.status_code == 200
    del result.data['date']
    assert result.data == {
        'title': post.title,
        'content': post.content,
        'cover': post.cover,
        'author': {'username': post.author.username,
                   'email': post.author.email,
                   'avatar': post.author.avatar}
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
def test_get_post_non_auth_user(anon_client, post):
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


@pytest.mark.django_db
def test_update_non_author_user(user_client, user, post):
    result = user_client.patch(f'/posts/{post.pk}/', {
        'title': 'vulgar title'
    })
    assert result.status_code == 403


@pytest.mark.django_db
def test_update_author_own_post(client, post):
    result = client.patch(f'/posts/{post.pk}/', {
        'title': 'new shiny title'
    })
    assert result.status_code == 200
    assert result.data['title'] == 'new shiny title'

# тест за това регистриран потребител може ли да редактира пост done
# тест за това _автора_ на поста може ли да редактира собствения си пост done


@pytest.mark.django_db
def test_update_author_not_own_post(post, another_client):
    result = another_client.patch(f'/posts/{post.pk}/', {
        'title': 'title-less ;)'
    })
    assert result.status_code == 403
