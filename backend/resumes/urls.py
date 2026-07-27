from django.urls import path
from .views import ResumeListCreateView, ResumeDetailView, AnalyzeResumeView

urlpatterns = [
    path("", ResumeListCreateView.as_view(), name="resume-list-create"),
    path("<int:pk>/", ResumeDetailView.as_view(), name="resume-detail"),
    path(
    "<int:pk>/analyze/",
    AnalyzeResumeView.as_view(),
    name="resume-analyze"
),
    
]