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
        print("[DEBUG] Generating structured JSON resume (safe mode)...")

        prompt_resume = PromptTemplate.from_template("""
        You are an expert resume parser and formatter.
        Your task is to convert the given user's profile into a **structured JSON resume**.

        ⚠️ STRICT RULES:
        - Use ONLY the information provided in USER PROFILE and JOB DESCRIPTION.
        - DO NOT add or imagine new roles, companies, projects, or skills.
        - DO NOT infer missing dates or invent achievements.
        - If information is missing, omit that field or leave it as an empty string.
        - Preserve original phrasing where possible.
        - Maintain professional tone, no extra commentary or markdown.

        ### INPUTS:
        JOB DESCRIPTION:
        {job_description}

        USER PROFILE / EXISTING RESUME TEXT:
        {user_profile}

        ### OUTPUT FORMAT (STRICTLY VALID JSON):
        {{
        "header": {{
            "title": "",
            "location": "",
            "contact": "",
            "linkedin": "",
            "github": ""
        }},
        "summary": "",
        "skills": [],
        "experience": [
            {{
            "role": "",
            "company": "",
            "duration": "",
            "points": []
            }}
        ],
        "projects": [
            {{
            "name": "",
            "description": ""
            }}
        ],
        "education": [
            {{
            "degree": "",
            "institute": "",
            "year": ""
            }}
        ]
        }}

        Only return valid JSON — no extra text.
        """)

        try:
            # ------------------------
            # Generate structured resume JSON
            # ------------------------
            chain_resume = prompt_resume | self.llm
            result = chain_resume.invoke({
                "job_description": str(job_description),
                "user_profile": str(user_profile)
            })

            raw_output = result.content if hasattr(result, "content") else str(result)
            print("[DEBUG] Raw model output (first 300 chars):", raw_output[:300])

            # Clean & sanitize
            raw_output = raw_output.strip().removeprefix("```json").removesuffix("```").strip()

            if len(raw_output) > 10000:
                print("[WARN] Output too long — truncating.")
                raw_output = raw_output[:10000]

            resume_data = json.loads(raw_output)
            print("[DEBUG] JSON parsing successful.")

            # ------------------------
            # Generate automatic resume title
            # ------------------------
            try:
                prompt_title = f"""
                Based on the job description and the user's resume data below,
                generate a short, professional title to identify this resume file.
                Format examples:
                - "Frontend Developer – Adobe"
                - "Data Analyst – Deloitte"
                - "HR Intern – Sleep.co"
                
                RULES:
                - Include the job role and company name if available.
                - Keep it under 6 words.
                - Do not use quotes or markdown.

                JOB DESCRIPTION:
                {job_description}

                RESUME DATA:
                {json.dumps(resume_data)}
                """

                title_result = self.llm.invoke(prompt_title)
                resume_title = title_result.content.strip().replace('"', '')

                if not resume_title:
                    # fallback if model output is blank
                    exp = resume_data.get("experience", [{}])[0]
                    role = exp.get("role") or resume_data.get("header", {}).get("title", "")
                    company = exp.get("company", "")
                    resume_title = f"{role} – {company}".strip(" –") or "Untitled Resume"

            except Exception as te:
                print("[WARN] Title generation failed:", te)
                exp = resume_data.get("experience", [{}])[0]
                role = exp.get("role") or resume_data.get("header", {}).get("title", "")
                company = exp.get("company", "")
                resume_title = f"{role} – {company}".strip(" –") or "Untitled Resume"

            resume_data["generated_title"] = resume_title
            print(f"[DEBUG] Auto-generated resume title: {resume_title}")

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
                "education": [],
                "generated_title": "Untitled Resume"
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


    def generate_ats_resume(self, data: dict) -> str:
        """
        Generate a clean, ATS-optimized HTML resume using structured data.
        The AI enhances resume content (summary, skills, experience) and
        returns a styled, consistent HTML structure.
        """
        print("[DEBUG] Generating enhanced ATS-optimized resume...")

        try:
            # === Extract Raw Data ===
            personal_info = data.get("personal_info", {})
            education = data.get("education", [])
            experience = data.get("experience", [])
            projects = data.get("projects", [])
            certifications = data.get("certifications", [])
            skills = data.get("skills", [])
            job_description = data.get("job_description", "")
            summary = data.get("summary", "")

            # === Ask LLM to Enhance Resume Content ===
            enhancement_prompt = ChatPromptTemplate.from_template("""
            You are a professional resume writer optimizing content for ATS systems.

            Given the following resume data and job description,
            enhance and rewrite the text to sound professional, concise,
            and keyword-optimized for the target role.

            Return only a valid JSON response in this exact structure:
            {{
            "summary": "...",
            "experience": [{{"role": "...", "company": "...", "duration": "...", "points": ["..."]}}],
            "projects": [{{"name": "...", "description": "..."}}],
            "skills": ["..."],
            "certifications": ["..."]
            }}

            ### Resume Data
            {data}

            ### Job Description
            {job_description}
            """)

            chain = enhancement_prompt | self.llm

            # Run the LLM and ensure a usable response
            response = chain.invoke({
                "data": json.dumps(data, ensure_ascii=False),
                "job_description": job_description
            })

            # Handle different possible response formats
            raw_output = ""
            if hasattr(response, "content"):
                raw_output = response.content.strip()
            elif isinstance(response, dict) and "content" in response:
                raw_output = response["content"].strip()
            else:
                raw_output = str(response).strip()

            print("[DEBUG] Raw LLM Output (first 150 chars):", raw_output[:150])

            # === Validate and Parse JSON ===
            if not raw_output:
                raise ValueError("Empty response from LLM")

            # Try parsing JSON safely — strip markdown fences or extra text if needed
            cleaned_output = raw_output
            if cleaned_output.startswith("```"):
                cleaned_output = cleaned_output.strip("`")
                cleaned_output = cleaned_output.replace("json", "").strip()

            try:
                enhanced = json.loads(cleaned_output)
            except json.JSONDecodeError:
                print("[WARN] LLM returned invalid JSON, falling back to original data.")
                enhanced = {}

            # Merge enhanced data with originals
            summary = enhanced.get("summary", summary)
            experience = enhanced.get("experience", experience)
            projects = enhanced.get("projects", projects)
            skills = enhanced.get("skills", skills)
            certifications = enhanced.get("certifications", certifications)

            # === Generate HTML ===
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
                    .links {{
                        margin-top: 6px;
                        font-size: 0.9rem;
                    }}
                    .links a {{
                        color: #2563eb;
                        text-decoration: none;
                        margin-right: 10px;
                    }}
                </style>
            </head>
            <body>
                <h1>{personal_info.get('name', '')}</h1>
                <div class="header-info">
                    <div>{personal_info.get('email', '')}</div>
                    <div>{personal_info.get('phone', '')}</div>
                    <div class="links">
                        {"".join(
                            f'<a href="{personal_info.get(link, "")}" target="_blank">{link.capitalize()}</a>'
                            for link in ['linkedin', 'github'] if personal_info.get(link)
                        )}
                    </div>
                </div>

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
                    {"".join(f'<div class="experience-item">'
                            f'<div class="experience-role">{exp.get("role", "")}</div>'
                            f'<div class="experience-company">{exp.get("company", "")} | {exp.get("duration", "")}</div>'
                            f'<ul>{"".join(f"<li>{p}</li>" for p in exp.get("points", []))}</ul>'
                            f'</div>'
                            for exp in experience)}
                </div>

                <div class="section">
                    <h2>Projects</h2>
                    {"".join(f'<div class="project-item"><div class="project-name">{p.get("name", "")}</div>'
                            f'<p>{p.get("description", "")}</p></div>'
                            for p in projects)}
                </div>

                <div class="section">
                    <h2>Certifications</h2>
                    <ul>
                        {"".join(f"<li>{c}</li>" for c in certifications)}
                    </ul>
                </div>

                <div class="section">
                    <h2>Education</h2>
                    {"".join(f'<div class="education-item">'
                            f'<strong>{edu.get("degree", "")}</strong> - {edu.get("institution", edu.get("institute", ""))} ({edu.get("year", "")})'
                            f'</div>'
                            for edu in education)}
                </div>
            </body>
            </html>
            """

            print("[DEBUG] Resume generated successfully.")
            return html.strip()

        except Exception as e:
            print("[ERROR] ATS resume generation failed:", e)
            raise
