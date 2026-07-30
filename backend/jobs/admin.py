from django.contrib import admin

# Register your models here.
from .models import JobDescription
from .models import JobDescription, ResumeMatch

admin.site.register(JobDescription)

admin.site.register(JobDescription)
admin.site.register(ResumeMatch)