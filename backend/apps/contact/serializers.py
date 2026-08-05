from rest_framework import serializers
from .models import ContactMessage, ProductEnquiry, JobApplication


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'phone', 'company', 'subject', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']


class ProductEnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductEnquiry
        fields = ['id', 'name', 'email', 'phone', 'company', 'product', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']


class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = ['id', 'name', 'email', 'phone', 'position', 'portfolio_url', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']
