from django.urls import path
from .views import ContactMessageCreateView, ProductEnquiryCreateView, JobApplicationCreateView

urlpatterns = [
    path('contact-messages/', ContactMessageCreateView.as_view(), name='contact-message-create'),
    path('product-enquiries/', ProductEnquiryCreateView.as_view(), name='product-enquiry-create'),
    path('job-applications/', JobApplicationCreateView.as_view(), name='job-application-create'),
]
