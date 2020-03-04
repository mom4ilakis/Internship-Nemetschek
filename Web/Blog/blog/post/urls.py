from rest_framework.routers import SimpleRouter
from .views import PostViewSet, PostPreviewSet

router = SimpleRouter()
router.register('posts', PostViewSet)
router.register('posts_preview', PostPreviewSet)

urlpatterns = router.urls
