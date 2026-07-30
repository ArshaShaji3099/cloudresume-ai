import re

# Keywords commonly found in software engineering resumes
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


def analyze_resume(text):
    text = text.lower()

    score = 0
    strengths = []
    weaknesses = []
    suggestions = []

    # Contact Information
    if re.search(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}", text):
        score += 10
        strengths.append("Email address found.")
    else:
        weaknesses.append("Email address is missing.")
        suggestions.append("Add a professional email address.")

    # Phone Number
    if re.search(r"\d{10}", text):
        score += 10
        strengths.append("Phone number found.")
    else:
        weaknesses.append("Phone number is missing.")
        suggestions.append("Include your phone number.")

    # GitHub
    if "github" in text:
        score += 10
        strengths.append("GitHub profile included.")
    else:
        weaknesses.append("GitHub profile missing.")
        suggestions.append("Add your GitHub profile link.")

    # LinkedIn
    if "linkedin" in text:
        score += 10
        strengths.append("LinkedIn profile included.")
    else:
        weaknesses.append("LinkedIn profile missing.")
        suggestions.append("Add your LinkedIn profile.")

    # Skills
    found_skills = []

    for skill in SKILLS:
        if skill in text:
            found_skills.append(skill)

    if len(found_skills) >= 8:
        score += 30
        strengths.append(
            f"Strong technical skillset ({len(found_skills)} skills detected)."
        )
    elif len(found_skills) >= 4:
        score += 20
        strengths.append(
            f"Good technical skills ({len(found_skills)} skills detected)."
        )
    else:
        weaknesses.append("Few technical skills detected.")
        suggestions.append("Include more relevant technical skills.")

    # Projects
    if "project" in text:
        score += 15
        strengths.append("Projects section detected.")
    else:
        weaknesses.append("Projects section missing.")
        suggestions.append("Add academic or personal projects.")

    # Experience
    if "experience" in text:
        score += 15
        strengths.append("Experience section detected.")
    else:
        weaknesses.append("Experience section missing.")
        suggestions.append("Include internships or work experience.")

    score = min(score, 100)

    return {
        "ats_score": score,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "suggestions": suggestions,
    }