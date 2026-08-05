from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import ContactMessage, ProductEnquiry, JobApplication
from .serializers import (
    ContactMessageSerializer,
    ProductEnquirySerializer,
    JobApplicationSerializer,
)


class ContactMessageCreateView(generics.CreateAPIView):
    """POST /api/contact-messages/ — public, no auth required."""
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]


class ProductEnquiryCreateView(generics.CreateAPIView):
    """POST /api/product-enquiries/ — public, no auth required."""
    queryset = ProductEnquiry.objects.all()
    serializer_class = ProductEnquirySerializer
    permission_classes = [AllowAny]


class JobApplicationCreateView(generics.CreateAPIView):
    """POST /api/job-applications/ — public, no auth required."""
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    permission_classes = [AllowAny]
