from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Product, ProductType
from .serializers import (
    ProductTypeSerializer,
    ProductTypeWriteSerializer,
    ProductListSerializer,
    ProductDetailSerializer,
    ProductWriteSerializer,
)


class ProductTypeViewSet(viewsets.ModelViewSet):
    """
    CRUD endpoints for ProductType.

    GET    /api/product-types/         — list all product types
    POST   /api/product-types/         — create a product type  [auth required]
    GET    /api/product-types/{id}/    — retrieve a product type
    PUT    /api/product-types/{id}/    — full update             [auth required]
    PATCH  /api/product-types/{id}/    — partial update          [auth required]
    DELETE /api/product-types/{id}/    — delete                  [auth required]
    """
    queryset = ProductType.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['name', 'created_at']
    ordering = ['name']

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return ProductTypeWriteSerializer
        return ProductTypeSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.products.exists():
            return Response(
                {'detail': 'Cannot delete a product type that has products assigned to it.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProductViewSet(viewsets.ModelViewSet):
    """
    CRUD endpoints for Product.

    GET    /api/products/              — list products (filter by product_type, is_active)
    POST   /api/products/              — create a product        [auth required]
    GET    /api/products/{id}/         — retrieve full product detail
    PUT    /api/products/{id}/         — full update             [auth required]
    PATCH  /api/products/{id}/         — partial update          [auth required]
    DELETE /api/products/{id}/         — delete                  [auth required]

    Query parameters:
      ?product_type=<id>     — filter by product type ID
      ?is_active=true/false  — filter by active status
      ?search=<term>         — search name and description
      ?ordering=name         — order by field
    """
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['product_type', 'is_active']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at', 'updated_at']
    ordering = ['-created_at']

    def get_queryset(self):
        return Product.objects.select_related('product_type').all()

    def get_serializer_class(self):
        if self.action == 'list':
            return ProductListSerializer
        if self.action in ['create', 'update', 'partial_update']:
            return ProductWriteSerializer
        return ProductDetailSerializer