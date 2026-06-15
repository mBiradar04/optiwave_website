from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductTypeViewSet, ProductViewSet

router = DefaultRouter()
router.register('product-types', ProductTypeViewSet, basename='product-type')
router.register('products', ProductViewSet, basename='product')

urlpatterns = [
    path('', include(router.urls)),
]