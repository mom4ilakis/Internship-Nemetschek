import pytest
from rest_framework.test import APIClient

from post.models import Post
from author.models import Author, User
from comment.models import Comment, Reply


@pytest.fixture
def anon_client():
    return APIClient()


@pytest.fixture
def author():
    author = Author(username='test_author', password='123456', avatar='none')
    author.save()
    return author


@pytest.fixture
def another_author():
    another_author = Author(username='test_author_2', password='123456', avatar='none')
    another_author.save()
    return another_author


@pytest.fixture
def user2():
    user2 = User(username='user2', password='123456')
    user2.save()
    return user2


@pytest.fixture
def commenting_user():
    user = User(username='commenting_user', password='123456')
    user.save()
    return user


@pytest.fixture
def replying_user():
    user = User(username='replying_user', password='123456')
    user.save()
    return user


@pytest.fixture
def client(author):
    client = APIClient()
    client.force_authenticate(user=author)
    return client


@pytest.fixture
def another_client(another_author):
    client = APIClient()
    client.force_authenticate(user=another_author)
    return client


@pytest.fixture
def post(author):
    return Post.objects.create(title="Title", content="Content", cover="cover",
                               author=author)


@pytest.fixture
def user():
    user = User.objects.create(username='non_author_test_user', password='123456')
    user.save()
    return user


@pytest.fixture
def user_client(user):
    user_client = APIClient()
    user_client.force_authenticate(user=user)
    return user_client


@pytest.fixture
def replying_client(replying_user):
    rep_client = APIClient()
    rep_client.force_authenticate(user=replying_user)
    return rep_client


@pytest.fixture
def comment(post, commenting_user):
    comment = Comment(post=post, author=commenting_user, content='comment1')
    comment.save()
    return comment
