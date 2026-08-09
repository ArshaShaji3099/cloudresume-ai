from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from resumes.models import Resume

from .models import JobDescription, ResumeMatch
from .serializers import (
    JobDescriptionSerializer,
    ResumeMatchSerializer,
)
from .matcher import match_resume


# ============================================================
# JOB DESCRIPTION
# ============================================================

class JobDescriptionListCreateView(generics.ListCreateAPIView):
    serializer_class = JobDescriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return JobDescription.objects.filter(
            user=self.request.user
        ).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user
        )


# ============================================================
# JOB DETAIL
# ============================================================

class JobDescriptionDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    serializer_class = JobDescriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return JobDescription.objects.filter(
            user=self.request.user
        )


# ============================================================
# RESUME MATCHING
# ============================================================

class ResumeMatchView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):

        resume_id = request.query_params.get(
            "resume_id"
        )

        # ----------------------------------------------------
        # Validate resume_id
        # ----------------------------------------------------

        if not resume_id:
            return Response(
                {
                    "detail": "resume_id is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # ----------------------------------------------------
        # Get Resume
        # ----------------------------------------------------

        try:
            resume = Resume.objects.get(
                id=resume_id,
                user=request.user
            )

        except Resume.DoesNotExist:
            return Response(
                {
                    "detail": "Resume not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # ----------------------------------------------------
        # Get Job
        # ----------------------------------------------------

        try:
            job = JobDescription.objects.get(
                id=pk,
                user=request.user
            )

        except JobDescription.DoesNotExist:
            return Response(
                {
                    "detail": "Job description not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # ----------------------------------------------------
        # Run Matching Algorithm
        # ----------------------------------------------------

        result = match_resume(
            resume.extracted_text,
            job.description
        )

        # ----------------------------------------------------
        # Create OR Update Match
        # ----------------------------------------------------

        match, created = ResumeMatch.objects.update_or_create(

            resume=resume,

            job=job,

            defaults={

                "match_score": result[
                    "match_score"
                ],

                "skills_score": result[
                    "skills_score"
                ],

                "keyword_score": result[
                    "keyword_score"
                ],

                "experience_score": result[
                    "experience_score"
                ],

                "matched_skills": result[
                    "matched_skills"
                ],

                "recommendations": result[
                    "recommendations"
                ],
            }
        )

        # ----------------------------------------------------
        # Serialize Match
        # ----------------------------------------------------

        serializer = ResumeMatchSerializer(
            match
        )

        # 201 = newly created
        # 200 = existing match updated

        if created:
            response_status = status.HTTP_201_CREATED
        else:
            response_status = status.HTTP_200_OK

        return Response(
            serializer.data,
            status=response_status
        )


# ============================================================
# MATCH HISTORY
# ============================================================

class ResumeMatchListView(
    generics.ListAPIView
):
    serializer_class = ResumeMatchSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return ResumeMatch.objects.filter(
            resume__user=self.request.user
        ).select_related(
            "resume",
            "job"
        ).order_by(
            "-created_at"
        )


# ============================================================
# MATCH ANALYTICS
# ============================================================

class ResumeMatchAnalyticsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        matches = ResumeMatch.objects.filter(
            resume__user=request.user
        )

        # ----------------------------------------------------
        # Total Matches
        # ----------------------------------------------------

        total_matches = matches.count()

        # ----------------------------------------------------
        # Score Statistics
        # ----------------------------------------------------

        if total_matches > 0:

            scores = [
                match.match_score
                for match in matches
            ]

            average_score = round(
                sum(scores) / len(scores)
            )

            best_score = max(scores)

            lowest_score = min(scores)

        else:

            average_score = 0
            best_score = 0
            lowest_score = 0

        # ----------------------------------------------------
        # Missing Skills
        # ----------------------------------------------------

        skill_counts = {}

        for match in matches:

            for skill in match.missing_skills:

                skill = skill.lower()

                skill_counts[skill] = (
                    skill_counts.get(skill, 0) + 1
                )

        # ----------------------------------------------------
        # Most Frequently Missing Skills
        # ----------------------------------------------------

        most_missing_skills = sorted(
            skill_counts.items(),
            key=lambda item: item[1],
            reverse=True
        )[:5]

        # ----------------------------------------------------
        # Response
        # ----------------------------------------------------

        return Response({

            "total_matches": total_matches,

            "average_score": average_score,

            "best_score": best_score,

            "lowest_score": lowest_score,

            "most_missing_skills": [
                {
                    "skill": skill,
                    "count": count
                }

                for skill, count
                in most_missing_skills
            ]

        })