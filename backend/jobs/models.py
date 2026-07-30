from django.db import models

# Create your models here.
from django.db import models
from django.conf import settings
from resumes.models import Resume


class JobDescription(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="job_descriptions",
    )

    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255, blank=True)
    description = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
    
class ResumeMatch(models.Model):
    resume = models.ForeignKey(
        Resume,
        on_delete=models.CASCADE
    )

    job = models.ForeignKey(
        JobDescription,
        on_delete=models.CASCADE
    )

    match_score = models.PositiveIntegerField()

    matched_skills = models.JSONField(default=list)

    missing_skills = models.JSONField(default=list)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.resume.title} - {self.job.title}"