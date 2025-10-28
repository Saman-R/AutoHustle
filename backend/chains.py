import os
import json
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate, ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.exceptions import OutputParserException
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer

load_dotenv()

class Chain:
    def __init__(self):
        print("[DEBUG] Initializing Chain and LLM...")
        self.llm = ChatGroq(
            temperature=0,
            groq_api_key=os.getenv("GROQ_API_KEY"),
            model_name="llama-3.3-70b-versatile"
        )
        print("[DEBUG] LLM initialized successfully.")

    # ---------------------------
    # Job Extraction
    # ---------------------------
    def extract_jobs(self, cleaned_text):
        print("[DEBUG] Starting job extraction...")
        prompt_extract = PromptTemplate.from_template(
            """
            ### SCRAPED TEXT FROM WEBSITE:
            {page_data}

            ### INSTRUCTION:
            Extract all job postings as a JSON array of objects with keys:
            "role", "experience", "skills", "description".
            Return only valid JSON.
            """
        )

        try:
            print("[DEBUG] Invoking LLM for job extraction...")
            chain_extract = prompt_extract | self.llm
            res = chain_extract.invoke(input={"page_data": cleaned_text})
            print(f"[DEBUG] Raw LLM output:\n{res.content[:300]}...")

            json_parser = JsonOutputParser()
            res_parsed = json_parser.parse(res.content)
            print("[DEBUG] JSON parsing successful.")
            return res_parsed if isinstance(res_parsed, list) else [res_parsed]
        except OutputParserException as e:
            print("[ERROR] JSON parsing failed:", e)
            raise
        except Exception as e:
            print("[ERROR] Job extraction failed:", e)
            raise

    # ---------------------------
    # Resume Generation
    # ---------------------------
    def generate_resume(self, job_description, user_profile):
        print("[DEBUG] Generating structured JSON resume...")

        prompt_resume = PromptTemplate.from_template("""
        You are a professional resume generator.
        Generate a concise, job-relevant resume as a strictly valid JSON object.
        Do NOT include commentary, markdown, or code fences.

        ### JOB DESCRIPTION:
        {job_description}

        ### USER PROFILE:
        {user_profile}

        ### RULES:
        - Include sections: "header", "summary", "skills", "experience", "projects", "education".
        - Each section must be meaningful and relevant to the job.
        - Do NOT use placeholders like "Not Applicable" or "N/A".
        - If data is unavailable, simply omit that key or use an empty list.
        - Limit "experience" to 3 entries, each with unique "role".
        - Keep total JSON under 1500 words.

        Example format:
        {{
          "header": {{
            "title": "Full Stack Developer",
            "location": "Chennai, India",
            "contact": "email@example.com",
            "linkedin": "linkedin.com/in/example",
            "github": "github.com/example"
          }},
          "summary": "Results-driven developer skilled in Python, React, and FastAPI.",
          "skills": ["Python", "React", "FastAPI", "MongoDB", "Docker"],
          "experience": [
            {{
              "role": "Software Intern",
              "company": "Adobe",
              "duration": "May 2025 - Aug 2025",
              "points": [
                "Built backend APIs using FastAPI and Uvicorn.",
                "Collaborated with UI team for frontend integration."
              ]
            }}
          ],
          "projects": [
            {{
              "name": "Interview Autopilot",
              "description": "AI-based interview generator with React + FastAPI."
            }}
          ],
          "education": [
            {{
              "degree": "MCA",
              "institute": "SRM Institute of Science and Technology",
              "year": "2024–Present"
            }}
          ]
        }}
        """)

        try:
            chain_resume = prompt_resume | self.llm
            result = chain_resume.invoke({
                "job_description": str(job_description),
                "user_profile": str(user_profile)
            })

            raw_output = result.content if hasattr(
                result, "content") else str(result)
            print("[DEBUG] Raw model output (first 300 chars):", raw_output[:300])

            # Clean JSON
            raw_output = raw_output.strip().removeprefix(
                "```json").removesuffix("```").strip()

            # Truncate runaway outputs
            if len(raw_output) > 10000:
                print("[WARN] Output too long — truncating.")
                raw_output = raw_output[:10000]

            resume_data = json.loads(raw_output)
            print("[DEBUG] JSON parsing successful.")
            return resume_data

        except json.JSONDecodeError as je:
            print("[ERROR] JSON parsing failed:", je)
            snippet = raw_output[:500].replace("\n", " ")
            print("[DEBUG] Raw snippet:", snippet)
            return {
                "header": {"title": "Resume (Parsing Fallback)", "location": ""},
                "summary": snippet,
                "skills": [],
                "experience": [],
                "projects": [],
                "education": []
            }
        except Exception as e:
            print("[ERROR] Resume generation failed:", e)
            raise

    # ---------------------------
    # HTML Resume Rendering
    # ---------------------------
    def generate_resume_html(self, resume_data, personal_info):
        header = resume_data.get("header", {})
        summary = resume_data.get("summary", "")
        skills = resume_data.get("skills", [])
        experience = resume_data.get("experience", [])
        projects = resume_data.get("projects", [])
        education = resume_data.get("education", [])

        html = f"""
        <html>
        <head>
            <style>
                body {{
                    font-family: 'Segoe UI', sans-serif;
                    margin: 20px;
                    color: #222;
                    background-color: #f9f9f9;
                }}
                h1 {{
                    color: #2563eb;
                    margin-bottom: 5px;
                }}
                h2 {{
                    color: #444;
                    border-bottom: 1px solid #ccc;
                    padding-bottom: 4px;
                    margin-top: 25px;
                }}
                .header-info {{
                    margin-bottom: 20px;
                    font-size: 0.95rem;
                    color: #555;
                }}
                .section {{
                    margin-bottom: 15px;
                }}
                .skills {{
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                }}
                .skill-chip {{
                    background-color: #2563eb;
                    color: #fff;
                    padding: 4px 8px;
                    border-radius: 12px;
                    font-size: 0.85rem;
                }}
                ul {{
                    margin: 0;
                    padding-left: 20px;
                }}
                .experience-item, .project-item {{
                    margin-bottom: 12px;
                }}
                .experience-role {{
                    font-weight: 600;
                }}
                .experience-company {{
                    font-style: italic;
                    color: #555;
                }}
                .project-name {{
                    font-weight: 600;
                }}
                .education-item {{
                    margin-bottom: 8px;
                }}
            </style>
        </head>
        <body>
            <h1>{personal_info.get('name')}</h1>
            <div class="header-info">{personal_info.get('contact')}</div>

            <div class="section">
                <h2>Summary</h2>
                <p>{summary}</p>
            </div>

            <div class="section">
                <h2>Skills</h2>
                <div class="skills">
                    {"".join(f'<span class="skill-chip">{s}</span>' for s in skills)}
                </div>
            </div>

            <div class="section">
                <h2>Experience</h2>
                {"".join(f'<div class="experience-item"><div class="experience-role">{exp.get("role")}</div>'
                         f'<div class="experience-company">{exp.get("company")} | {exp.get("duration")}</div>'
                         f'<ul>{"".join(f"<li>{p}</li>" for p in exp.get("points", []))}</ul></div>'
                         for exp in experience)}
            </div>

            <div class="section">
                <h2>Projects</h2>
                {"".join(f'<div class="project-item"><div class="project-name">{p.get("name")}</div>'
                             f'<p>{p.get("description")}</p></div>' for p in projects)}
            </div>

            <div class="section">
                <h2>Education</h2>
                {"".join(f'<div class="education-item"><strong>{edu.get("degree")}</strong> - {edu.get("institute")} ({edu.get("year")})</div>'
                                 for edu in education)}
            </div>
        </body>
        </html>
        """
        return html

    # ---------------------------
    # Cold Email Generation
    # ---------------------------

    def generate_cold_email(self, job_description, user_profile, links=None):
        print("[DEBUG] Generating cold email...")
        prompt_email = PromptTemplate.from_template(
            """
            ### JOB DESCRIPTION:
            {job_description}

            ### CANDIDATE PROFILE:
            {user_profile}

            ### PORTFOLIO LINKS:
            {link_list}

            ### INSTRUCTION:
            Write a short, professional cold email to the recruiter
            showing genuine interest in the role. Include greeting,
            highlight skills, optionally portfolio links, and a CTA.
            Keep under 180 words.
            """
        )

        try:
            chain_email = prompt_email | self.llm
            result = chain_email.invoke({
                "job_description": str(job_description),
                "user_profile": str(user_profile),
                "link_list": links or "N/A"
            })
            print("[DEBUG] Cold email generation successful.")
            return result.content.strip()
        except Exception as e:
            print("[ERROR] Cold email generation failed:", e)
            raise

# ---------------------------
#Just resume generation
# ---------------------------
    # ---------------------------
    # ATS-Friendly Resume Generation
    # ---------------------------

    def generate_ats_resume(self, data: dict) -> str:
        """
        Generate a clean, ATS-optimized HTML resume using provided structured data.
        This uses the Groq LLM directly — no JSON formatting, just final HTML output.
        """
        print("[DEBUG] Generating ATS-optimized resume...")

        resume_prompt = ChatPromptTemplate.from_template("""
        You are an expert professional resume writer specializing in ATS-optimized resumes.

        ### Personal Information
        Name: {name}
        Email: {email}
        LinkedIn: {linkedin}
        GitHub: {github}

        ### Job Description
        {job_description}

        ### Education
        {education}

        ### Experience
        {experience}

        ### Certifications
        {certifications}

        ### Soft Skills
        {soft_skills}

        ### Hard Skills
        {hard_skills}

        ---
        **Instructions:**
        - Create a concise, professional, and well-structured HTML resume.
        - Focus on relevance to the job description.
        - Avoid tables or images — use semantic `<section>` and `<ul>` tags.
        - Ensure it is easy for ATS systems to parse.
        - Return only valid HTML (no commentary, markdown, or explanations).
        """)

        try:
            education_text = "\n".join([
                f"{e.get('degree', '')} at {e.get('institution', '')} ({e.get('year', '')})"
                for e in data.get("education", [])
            ])
            experience_text = "\n".join([
                f"{e.get('role', '')} at {e.get('company', '')} — {e.get('duration', '')}\n{e.get('description', '')}"
                for e in data.get("experience", [])
            ])

            chain = resume_prompt | self.llm

            result = chain.invoke({
                "name": data["personal_info"].get("name", ""),
                "email": data["personal_info"].get("email", ""),
                "linkedin": data["personal_info"].get("linkedin", ""),
                "github": data["personal_info"].get("github", ""),
                "job_description": data.get("job_description", ""),
                "education": education_text,
                "experience": experience_text,
                "certifications": ", ".join(data.get("certifications", [])),
                "soft_skills": ", ".join(data.get("soft_skills", [])),
                "hard_skills": ", ".join(data.get("hard_skills", [])),
            })

            html_output = result.content if hasattr(
                result, "content") else str(result)
            print(
                "[DEBUG] ATS resume generation successful (first 200 chars):", html_output[:200])
            return html_output.strip()

        except Exception as e:
            print("[ERROR] ATS resume generation failed:", e)
            raise
