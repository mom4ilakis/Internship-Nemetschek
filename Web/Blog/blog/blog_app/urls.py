from django.contrib import admin
from django.urls import path, include

from author.urls import urlpatterns as author_urls
from comment.urls import urlpatterns as comment_urls
from post.urls import urlpatterns as post_urls


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    path('', include(author_urls)),
    path('', include(comment_urls)),
    path('', include(post_urls))
]
