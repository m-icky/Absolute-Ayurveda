from django.contrib import admin
from .models import Specialist, Gallery, ConsultationRequest, courses, Packages, AdminProfile, BlogPost

admin.site.register(Specialist)
admin.site.register(Gallery)
admin.site.register(ConsultationRequest)
admin.site.register(courses)
admin.site.register(Packages)
admin.site.register(AdminProfile)
admin.site.register(BlogPost)
