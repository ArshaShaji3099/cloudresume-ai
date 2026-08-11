# cloudresume-ai
Cloud-native AI Resume Analyzer built with React, Django, Docker, and AI.


## Job Matching

ResumePilot compares a user's resume with a job description and provides:

- Overall match score
- Skills match score
- Keyword match score
- Experience match score
- Matched skills
- Missing skills
- Personalized recommendations

### Matching Algorithm

The matching engine uses a weighted scoring system:

- Skills: 60%
- Keywords: 20%
- Experience: 20%
