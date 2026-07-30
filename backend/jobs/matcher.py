import re

SKILLS = [
    "python",
    "django",
    "flask",
    "fastapi",
    "javascript",
    "typescript",
    "react",
    "node",
    "html",
    "css",
    "bootstrap",
    "tailwind",
    "sql",
    "mysql",
    "postgresql",
    "mongodb",
    "docker",
    "git",
    "github",
    "aws",
    "azure",
    "rest api",
    "api",
]


def match_resume(resume_text, job_description):
    resume_text = resume_text.lower()
    job_description = job_description.lower()

    matched_skills = []
    missing_skills = []

    required_skills = []

    for skill in SKILLS:
        if skill in job_description:
            required_skills.append(skill)

    for skill in required_skills:
        if skill in resume_text:
            matched_skills.append(skill)
        else:
            missing_skills.append(skill)

    if required_skills:
        score = int((len(matched_skills) / len(required_skills)) * 100)
    else:
        score = 0

    return {
        "match_score": score,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "suggestions": [
            f"Consider adding {skill}" for skill in missing_skills
        ]
    }