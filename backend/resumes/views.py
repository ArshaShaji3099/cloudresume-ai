from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .utils import extract_text_from_pdf
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Resume, ResumeAnalysis
from .serializers import ResumeSerializer, ResumeAnalysisSerializer


class ResumeListCreateView(generics.ListCreateAPIView):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        return Resume.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        resume = serializer.save(user=self.request.user)

        if resume.file:
            extracted_text = extract_text_from_pdf(resume.file.path)

            resume.extracted_text = extracted_text
            resume.save(update_fields=["extracted_text"])
        
        
class ResumeDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Resume.objects.filter(user=self.request.user)
    

class AnalyzeResumeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            resume = Resume.objects.get(
                pk=pk,
                user=request.user
            )
        except Resume.DoesNotExist:
            return Response(
                {"detail": "Resume not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        if not resume.extracted_text:
            return Response(
                {"detail": "No text was extracted from this resume."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Temporary analysis
        analysis_data = {
            "ats_score": 70,
            "strengths": [
                "Resume contains readable text",
                "Resume was successfully processed"
            ],
            "weaknesses": [
                "AI analysis has not been connected yet"
            ],
            "suggestions": [
                "Connect the AI analysis service"
            ]
        }

        analysis, created = ResumeAnalysis.objects.update_or_create(
            resume=resume,
            defaults=analysis_data
        )

        serializer = ResumeAnalysisSerializer(analysis)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK
        )