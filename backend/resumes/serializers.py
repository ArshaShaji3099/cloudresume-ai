from rest_framework import serializers
from .models import Resume, ResumeAnalysis


class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = [
            "id",
            "title",
            "file",
            "extracted_text",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "extracted_text",
            "created_at",
            "updated_at",
        ]
        
class ResumeAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeAnalysis
        fields = [
            "id",
            "resume",
            "ats_score",
            "strengths",
            "weaknesses",
            "suggestions",
            "analyzed_at",
        ]

        read_only_fields = [
            "id",
            "resume",
            "ats_score",
            "strengths",
            "weaknesses",
            "suggestions",
            "analyzed_at",
        ]