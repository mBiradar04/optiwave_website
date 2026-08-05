from django.db import models


class ContactMessage(models.Model):
    """A general enquiry submitted via the Contact Us page."""
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    company = models.CharField(max_length=150, blank=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Contact Message'
        verbose_name_plural = 'Contact Messages'

    def __str__(self):
        return f'{self.name} — {self.subject}'


class ProductEnquiry(models.Model):
    """An enquiry about a specific product, submitted from the product detail drawer."""
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    company = models.CharField(max_length=150, blank=True)
    product = models.ForeignKey(
        'products.Product',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='enquiries',
    )
    # Snapshot of the product name at submission time, so the enquiry stays
    # meaningful in admin even if the product is later renamed or deleted.
    product_name = models.CharField(max_length=255, blank=True)
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Product Enquiry'
        verbose_name_plural = 'Product Enquiries'

    def save(self, *args, **kwargs):
        if self.product and not self.product_name:
            self.product_name = self.product.name
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.name} — {self.product_name or "Product"}'


class JobApplication(models.Model):
    """A candidate application submitted from the Career page."""
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    # Job title text, or "Open Application" — Career jobs live in frontend
    # data, not the database, so this is not a foreign key.
    position = models.CharField(max_length=200)
    portfolio_url = models.URLField(blank=True)
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Job Application'
        verbose_name_plural = 'Job Applications'

    def __str__(self):
        return f'{self.name} — {self.position}'
