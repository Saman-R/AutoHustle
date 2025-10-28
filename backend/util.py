import re


def clean_text(text):
    # Remove HTML tags
    text = re.sub(r'<[^>]*?>', '', text)
    # Remove URLs
    text = re.sub(
        r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', '', text)
    # Remove special characters
    text = re.sub(r'[^a-zA-Z0-9 ]', '', text)
    # Replace multiple spaces with a single space
    text = re.sub(r'\s{2,}', ' ', text)
    # Trim leading and trailing whitespace
    text = text.strip()
    # Remove extra whitespace
    text = ' '.join(text.split())
    return text


def parse_resume_text(text):
    """
    Extract basic personal info from resume text: name, email, phone, linkedin, github
    """
    info = {}

    # Email
    email_match = re.search(r'[\w\.-]+@[\w\.-]+', text)
    info['email'] = email_match.group(0) if email_match else None

    # Phone (simple Indian/global format)
    phone_match = re.search(r'(\+?\d{1,3}[-.\s]?)?(\d{10,12})', text)
    info['phone'] = phone_match.group(0) if phone_match else None

    # LinkedIn
    linkedin_match = re.search(
        r'(https?://(www\.)?linkedin\.com/in/[A-Za-z0-9_-]+)', text)
    info['linkedin'] = linkedin_match.group(0) if linkedin_match else None

    # GitHub
    github_match = re.search(
        r'(https?://(www\.)?github\.com/[A-Za-z0-9_-]+)', text)
    info['github'] = github_match.group(0) if github_match else None

    # Name (heuristic: first line with words, assuming it’s the candidate name)
    lines = text.split("\n")
    for line in lines:
        line = line.strip()
        if len(line.split()) >= 2 and not any(k in line.lower() for k in ['email', 'phone', 'linkedin', 'github']):
            info['name'] = line
            break
    if 'name' not in info:
        info['name'] = "Your Name"

    # Location (optional: look for city/state keywords)
    location_match = re.search(r'([A-Za-z ]+,\s*[A-Za-z ]+)', text)
    info['location'] = location_match.group(0) if location_match else None

    return info
