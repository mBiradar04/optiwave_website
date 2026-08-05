from rest_framework import serializers
from .models import Product, ProductType


class ProductTypeSerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = ProductType
        fields = ['id', 'name', 'slug', 'product_count', 'created_at', 'updated_at']
        read_only_fields = ['id', 'slug', 'product_count', 'created_at', 'updated_at']

    def get_product_count(self, obj):
        return obj.products.filter(is_active=True).count()


class ProductTypeWriteSerializer(serializers.ModelSerializer):
    """Used for create and update operations."""

    class Meta:
        model = ProductType
        fields = ['name']

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Product type name cannot be blank.")
        return value.strip()


class ProductListSerializer(serializers.ModelSerializer):
    """Lightweight serializer used for listing products."""
    product_type = ProductTypeSerializer(read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'specifications',
            'product_type', 'image_urls', 'is_active', 'created_at',
        ]
        read_only_fields = ['id', 'slug', 'created_at']


class ProductDetailSerializer(serializers.ModelSerializer):
    """Full serializer used for retrieve operations."""
    product_type = ProductTypeSerializer(read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'specifications',
            'image_urls', 'product_type', 'is_active', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']


class ProductWriteSerializer(serializers.ModelSerializer):
    """Used for create and update operations. Accepts product_type as an ID."""
    product_type_id = serializers.PrimaryKeyRelatedField(
        queryset=ProductType.objects.all(),
        source='product_type',
        write_only=True
    )

    class Meta:
        model = Product
        fields = [
            'name', 'description', 'specifications',
            'image_urls', 'product_type_id', 'is_active',
        ]

    def validate_image_urls(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("image_urls must be a list of URL strings.")
        for url in value:
            if not isinstance(url, str) or not url.startswith(('http://', 'https://', '/')):
                raise serializers.ValidationError(
                    f"Invalid URL in image_urls: '{url}'"
                )
        return value

    def validate_specifications(self, value):
        if not isinstance(value, dict):
            raise serializers.ValidationError("specifications must be a JSON object (dict).")
        return value