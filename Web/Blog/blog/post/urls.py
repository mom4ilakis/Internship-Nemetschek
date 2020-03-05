from rest_framework.routers import SimpleRouter
from .views import PostViewSet, PostPreviewSet, CommentsOnPostViewSet

router = SimpleRouter()
router.register('posts', PostViewSet)
router.register('posts_preview', PostPreviewSet)
router.register('comments_on_post', CommentsOnPostViewSet)

urlpatterns = router.urls
