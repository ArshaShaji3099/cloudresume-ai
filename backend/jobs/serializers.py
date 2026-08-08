from rest_framework import serializers

from .models import JobDescription, ResumeMatch


class JobDescriptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = JobDescription
        fields = "__all__"

        read_only_fields = [
            "id",
            "user",
            "created_at",
        ]


class ResumeMatchSerializer(serializers.ModelSerializer):
    
    resume_title = serializers.CharField(
        source="resume.title",
        read_only=True
    )

    job_title = serializers.CharField(
        source="job.title",
        read_only=True
    )

    company = serializers.CharField(
        source="job.company",
        read_only=True
    )

    class Meta:
        model = ResumeMatch

        fields = [
            "id",

            "resume",
            "resume_title",

            "job",
            "job_title",
            "company",

            "match_score",

            "skills_score",
            "keyword_score",
            "experience_score",

            "matched_skills",
            "missing_skills",

            "created_at",
        ]

        read_only_fields = [
            "id",

            "resume",
            "resume_title",

            "job",
            "job_title",
            "company",

            "match_score",

            "skills_score",
            "keyword_score",
            "experience_score",

            "matched_skills",
            "missing_skills",

            "created_at",
        ]