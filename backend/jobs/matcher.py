import re


SKILLS = [
    # Programming Languages
    "python",
    "javascript",
    "typescript",
    "java",
    "c++",
    "c#",
    "php",
    "ruby",
    "go",
    "kotlin",
    "swift",

    # Frontend
    "html",
    "css",
    "bootstrap",
    "tailwind",
    "react",
    "react.js",
    "angular",
    "vue",
    "next.js",

    # Backend
    "django",
    "django rest framework",
    "flask",
    "fastapi",
    "node",
    "node.js",
    "express",
    "express.js",

    # APIs
    "rest api",
    "graphql",
    "websocket",

    # Databases
    "sql",
    "mysql",
    "postgresql",
    "postgres",
    "mongodb",
    "sqlite",
    "mariadb",
    "redis",
    "oracle",

    # Cloud
    "aws",
    "azure",
    "google cloud",
    "gcp",
    "ec2",
    "s3",
    "lambda",

    # DevOps
    "docker",
    "docker compose",
    "kubernetes",
    "jenkins",
    "github actions",
    "gitlab ci",
    "ci/cd",
    "terraform",
    "ansible",

    # Version Control
    "git",
    "github",
    "gitlab",
    "bitbucket",

    # AI / ML
    "artificial intelligence",
    "machine learning",
    "deep learning",
    "tensorflow",
    "pytorch",
    "scikit-learn",
    "sklearn",
    "pandas",
    "numpy",
    "opencv",
    "nlp",

    # Testing
    "pytest",
    "unittest",
    "selenium",
    "cypress",
    "playwright",
    "jest",

    # Concepts
    "microservices",
    "agile",
    "scrum",
    "oop",
    "object oriented programming",
    "data structures",
    "algorithms",

    # Tools
    "linux",
    "postman",
    "jira",
]


KEYWORDS = [
    "software engineer",
    "software developer",
    "developer",
    "programmer",
    "backend developer",
    "frontend developer",
    "full stack developer",
    "full stack",
    "backend",
    "frontend",
    "web development",
    "software development",
    "application development",
    "rest api",
    "rest apis",
    "api",
    "apis",
    "database",
    "databases",
    "testing",
    "debugging",
    "deployment",
    "development",
    "architecture",
    "application",
    "applications",
    "project",
    "projects",
    "development lifecycle",
    "software development lifecycle",
    "team",
    "teams",
    "agile",
    "scrum",
]


EXPERIENCE_TERMS = [
    "experience",
    "years",
    "worked",
    "developed",
    "built",
    "designed",
    "implemented",
    "maintained",
    "managed",
    "deployed",
]


def normalize_text(text):
    """
    Normalize text before matching.
    """

    if not text:
        return ""

    text = text.lower()
    text = re.sub(r"\s+", " ", text)

    return text.strip()


def skill_exists(skill, text):
    """
    Check whether a skill exists as a complete term.
    """

    skill = skill.lower().strip()

    pattern = rf"(?<!\w){re.escape(skill)}(?!\w)"

    return re.search(pattern, text) is not None


def count_terms(terms, text):
    """
    Count how many terms from a list appear in text.
    """

    count = 0

    for term in terms:
        if skill_exists(term, text):
            count += 1

    return count


def calculate_skill_score(
    matched_skills,
    required_skills
):
    """
    Calculate percentage based on required skills.
    """

    if not required_skills:
        return 0

    return round(
        (len(matched_skills) / len(required_skills)) * 100
    )


def calculate_keyword_score(
    job_description,
    resume_text
):
    """
    Compare general job-related keywords.
    """

    job_keywords = [
        keyword
        for keyword in KEYWORDS
        if skill_exists(keyword, job_description)
    ]

    if not job_keywords:
        return 100

    matched_keywords = [
        keyword
        for keyword in job_keywords
        if skill_exists(keyword, resume_text)
    ]

    return round(
        (len(matched_keywords) / len(job_keywords)) * 100
    )


def calculate_experience_score(
    job_description,
    resume_text
):
    """
    Compare experience-related language.
    """

    job_experience_terms = [
        term
        for term in EXPERIENCE_TERMS
        if skill_exists(term, job_description)
    ]

    if not job_experience_terms:
        return 100

    matched_terms = [
        term
        for term in job_experience_terms
        if skill_exists(term, resume_text)
    ]

    return round(
        (len(matched_terms) / len(job_experience_terms)) * 100
    )


def generate_recommendations(
    missing_skills,
    skills_score,
    keyword_score,
    experience_score
):
    """
    Generate actionable recommendations based
    on resume-job matching results.
    """

    recommendations = []

    # Missing skills
    for skill in missing_skills[:5]:
        recommendations.append({
            "type": "skill",
            "priority": "high",
            "title": f"Improve {skill}",
            "message": (
                f"Consider adding {skill} to your resume "
                "if you have relevant experience."
            ),
        })

    # Skills score
    if skills_score < 60:
        recommendations.append({
            "type": "skills",
            "priority": "high",
            "title": "Improve your technical skill match",
            "message": (
                "Your resume is missing several skills "
                "required by this job. Highlight relevant "
                "technical skills from your projects and experience."
            ),
        })

    elif skills_score < 80:
        recommendations.append({
            "type": "skills",
            "priority": "medium",
            "title": "Strengthen your technical skills",
            "message": (
                "Your technical skill match is moderate. "
                "Consider highlighting more relevant skills "
                "from your projects and experience."
            ),
        })

    # Keyword score
    if keyword_score < 60:
        recommendations.append({
            "type": "keywords",
            "priority": "high",
            "title": "Improve resume keywords",
            "message": (
                "Your resume does not contain enough "
                "job-related keywords. Consider naturally "
                "using relevant terminology from the job description."
            ),
        })

    elif keyword_score < 80:
        recommendations.append({
            "type": "keywords",
            "priority": "medium",
            "title": "Add more relevant keywords",
            "message": (
                "Consider naturally incorporating more "
                "keywords from the job description into your resume."
            ),
        })

    # Experience score
    if experience_score < 60:
        recommendations.append({
            "type": "experience",
            "priority": "high",
            "title": "Highlight your experience",
            "message": (
                "Your resume has limited overlap with "
                "the experience requirements of this job. "
                "Highlight relevant projects and work experience."
            ),
        })

    elif experience_score < 80:
        recommendations.append({
            "type": "experience",
            "priority": "medium",
            "title": "Strengthen experience descriptions",
            "message": (
                "Add measurable achievements and explain "
                "how you used the required technologies "
                "in your projects or previous work."
            ),
        })

    # Strong match
    if (
        skills_score >= 80
        and keyword_score >= 80
        and experience_score >= 80
    ):
        recommendations.append({
            "type": "overall",
            "priority": "low",
            "title": "Strong match",
            "message": (
                "Your resume is a strong match for this job. "
                "Focus on tailoring your experience and "
                "achievements to the specific position."
            ),
        })

    return recommendations


def match_resume(
    resume_text,
    job_description
):
    """
    Match a resume against a job description.
    """

    resume_text = normalize_text(resume_text)
    job_description = normalize_text(job_description)

    # Find required skills
    required_skills = []

    for skill in SKILLS:
        if skill_exists(skill, job_description):
            required_skills.append(skill)

    # Match skills
    matched_skills = []
    missing_skills = []

    for skill in required_skills:
        if skill_exists(skill, resume_text):
            matched_skills.append(skill)
        else:
            missing_skills.append(skill)

    # Calculate scores
    skills_score = calculate_skill_score(
        matched_skills,
        required_skills
    )

    keyword_score = calculate_keyword_score(
        job_description,
        resume_text
    )

    experience_score = calculate_experience_score(
        job_description,
        resume_text
    )

    # Final weighted score
    final_score = round(
        (skills_score * 0.60)
        + (keyword_score * 0.20)
        + (experience_score * 0.20)
    )

    # Basic suggestions
    suggestions = [
        f"Consider adding {skill} to your resume "
        "if you have experience with it."
        for skill in missing_skills
    ]

    if keyword_score < 70:
        suggestions.append(
            "Consider using more job-related keywords "
            "from the job description in your resume."
        )

    if experience_score < 70:
        suggestions.append(
            "Consider highlighting your relevant "
            "development experience and achievements."
        )

    # Recommendations
    recommendations = generate_recommendations(
        missing_skills,
        skills_score,
        keyword_score,
        experience_score
    )

    return {
        "match_score": final_score,
        "skills_score": skills_score,
        "keyword_score": keyword_score,
        "experience_score": experience_score,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "suggestions": suggestions,
        "recommendations": recommendations,
    }