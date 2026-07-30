from django.urls import path

from .views import (
    JobDescriptionListCreateView,
    JobDescriptionDetailView,
)

urlpatterns = [
    path("", JobDescriptionListCreateView.as_view(), name="job-list-create"),
    path("<int:pk>/", JobDescriptionDetailView.as_view(), name="job-detail"),
]