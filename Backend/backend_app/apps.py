from django.apps import AppConfig
from django.db.models.signals import post_migrate

def create_default_superuser(sender, **kwargs):
    from django.contrib.auth.models import User
    
    default_username = "admin"
    default_email = "admin@gmail.com"
    default_password = "http://localhost:3000/blog"

    if not User.objects.filter(username=default_username).exists():
        User.objects.create_superuser(username=default_username, email=default_email, password=default_password)
        print(f"*** SUCCESS: Predefined Admin Created ({default_username}) ***")


class BackendAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'backend_app'  

    def ready(self):
        post_migrate.connect(create_default_superuser, sender=self)