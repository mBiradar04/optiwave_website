from django.contrib import admin
from .models import ContactMessage, ProductEnquiry, JobApplication


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['created_at']
    ordering = ['-created_at']


@admin.register(ProductEnquiry)
class ProductEnquiryAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'product_name', 'created_at']
    list_filter = ['product']
    search_fields = ['name', 'email', 'product_name', 'message']
    readonly_fields = ['product_name', 'created_at']
    ordering = ['-created_at']


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'position', 'created_at']
    list_filter = ['position']
    search_fields = ['name', 'email', 'position', 'message']
    readonly_fields = ['created_at']
    ordering = ['-created_at']
