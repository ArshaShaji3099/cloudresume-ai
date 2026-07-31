from rest_framework import serializers
from .models import JobDescription, ResumeMatch


class JobDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobDescription
        fields = "__all__"
        read_only_fields = ["id", "user", "created_at"]


class ResumeMatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeMatch
        fields = "__all__"
        read_only_fields = ["id", "created_at"]