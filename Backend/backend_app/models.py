from django.db import models

class Specialist(models.Model):
    name = models.CharField(max_length=150)
    designation = models.CharField(max_length=150, blank=True, null=True)
    specialty = models.CharField(max_length=150, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='specialists/', blank=True, null=True)
    experience = models.PositiveIntegerField(null=True, blank=True)
    status = models.CharField(max_length=10, default='active')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Gallery(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='gallery/')
    description = models.TextField(blank=True)    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class ConsultationRequest(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField(null=True, blank=True)
    message = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=20,default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.status})"

class courses(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='courses/')
    duration = models.CharField(max_length=50)
    level = models.CharField(max_length=20)
    status = models.CharField(max_length=20,default='active')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.status})"

class Packages(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='packages/')
    price = models.CharField(max_length=20,null=True, blank=True)
    status = models.CharField(max_length=20,default='active')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.status})"