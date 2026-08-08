from django.urls import path

from .views import (
    JobDescriptionListCreateView,
    JobDescriptionDetailView,
    ResumeMatchView,ResumeMatchListView,
    ResumeMatchAnalyticsView,
)

urlpatterns = [
    path("", JobDescriptionListCreateView.as_view(), name="job-list-create"),
    path("<int:pk>/", JobDescriptionDetailView.as_view(), name="job-detail"),
    path("<int:pk>/match/",ResumeMatchView.as_view(),name="resume-match"),
    path("matches/",ResumeMatchListView.as_view(),name="resume-match-list"),
    path(
    "analytics/",
    ResumeMatchAnalyticsView.as_view(),
    name="match-analytics",
),
]