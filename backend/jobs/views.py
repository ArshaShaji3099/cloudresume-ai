from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from resumes.models import Resume
from .models import JobDescription, ResumeMatch
from .serializers import ResumeMatchSerializer
from .matcher import match_resume
from .models import JobDescription
from .serializers import JobDescriptionSerializer


class JobDescriptionListCreateView(generics.ListCreateAPIView):
    serializer_class = JobDescriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return JobDescription.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class JobDescriptionDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = JobDescriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return JobDescription.objects.filter(user=self.request.user)
    
    
    
class ResumeMatchView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        resume_id = request.query_params.get("resume_id")

        if not resume_id:
            return Response(
                {"detail": "resume_id is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            resume = Resume.objects.get(
                id=resume_id,
                user=request.user
            )

            job = JobDescription.objects.get(
                id=pk,
                user=request.user
            )

        except Resume.DoesNotExist:
            return Response(
                {"detail": "Resume not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        except JobDescription.DoesNotExist:
            return Response(
                {"detail": "Job description not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        result = match_resume(
            resume.extracted_text,
            job.description
        )

        match = ResumeMatch.objects.create(
            resume=resume,
            job=job,
            match_score=result["match_score"],
            matched_skills=result["matched_skills"],
            missing_skills=result["missing_skills"],
        )

        serializer = ResumeMatchSerializer(match)

        return Response(serializer.data, status=status.HTTP_201_CREATED)