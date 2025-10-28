# app.py
from fastapi import FastAPI, Form, File, UploadFile
from fastapi import (
    FastAPI,
    Depends,
    HTTPException,
    UploadFile,
    File,
    Form,
    Query,
    status,
)
from chains import Chain
from util import clean_text
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from sqlalchemy.future import select
from models import User
from schemas import SignupSchema, LoginSchema, UserResponse, ResumeRequest, Education,Experience, PersonalInfo
from utils.password_helper import hash_password, verify_password
from db import SessionLocal, engine, Base
from fastapi.middleware.cors import CORSMiddleware
from utils.parser import parse_file

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/login")
async def login(request: LoginSchema, db: AsyncSession = Depends(get_db)):
    result = db.execute(select(User).filter_by(email=request.email.strip()))
    user = result.scalars().first()

    if not user or not verify_password(request.password.strip(), user.hashed_password):
        raise HTTPException(
            status_code=401, detail="Invalid email or password")

    return {
        "success": True,
        "message": f"Welcome {user.name}!",
        "name": user.name,
    }


@app.post("/signup")
async def signup(request: SignupSchema, db: AsyncSession = Depends(get_db)):
    result = db.execute(select(User).filter_by(email=request.email.strip()))
    existing_user = result.scalars().first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        email=request.email.strip(),
        hashed_password=hash_password(
            request.password.strip()),  # ✅ match DB column
        name=request.name.strip(),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"success": True, "message": f"Account created for {new_user.name}"}


@app.post("/upload-resume")
async def upload_resume(
    email: str = Form(...),
    resume: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    try:
        # Parse the uploaded file into text
        text = await parse_file(resume)
    except Exception as e:
        raise HTTPException(
            status_code=400, detail=f"Error parsing file: {str(e)}")

    # Find the user by email
    user = db.query(User).filter_by(email=email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Update the resume column
    user.resume = text
    db.commit()
    db.refresh(user)

    return {
        "message": "Resume uploaded and parsed successfully",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "preferences": user.preferences,
        }
    }


@app.get("/users-email/{email}")
def get_user_by_email(email: str, db: Session = Depends(get_db)):
    user = db.execute(select(User).where(
        User.email == email)).scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Exclude sensitive info
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "resume": user.resume,
        "preferences": user.preferences
    }


chain = Chain()


@app.post("/api/generate-resume")
async def generate_resume(
    job_description: str = Form(""),
    profile_text: str = Form(""),
    name: str = Form(""),
    contact: str = Form(""),
    resume_file: UploadFile = File(None)
):
    import PyPDF2

    if resume_file:
        if resume_file.content_type == "application/pdf":
            pdf_reader = PyPDF2.PdfReader(resume_file.file)
            profile_text = "\n".join([page.extract_text()
                                    for page in pdf_reader.pages])
        else:
            profile_text = resume_file.file.read().decode("utf-8")

    resume_json = chain.generate_resume(job_description, profile_text)
    personal_info = {
        "name": name or resume_json.get("header", {}).get("title", "Your Name"),
        "contact": contact or resume_json.get("header", {}).get("contact", "")
    }
    resume_html = chain.generate_resume_html(resume_json, personal_info)
    cold_email = chain.generate_cold_email(job_description, profile_text)

    return {
        "resume_html": resume_html,
        "cold_email": cold_email,
        "resume_json": resume_json,
        "personal_info": personal_info
    }

@app.post("/api/generate-ats-resume")
async def generate_ats_resume(data: dict):
    try:
        print("[DEBUG] Received ATS resume request.")
        result_html = chain.generate_ats_resume(data)
        return {"resume_html": result_html}
    except Exception as e:
        print("[ERROR] Failed to generate ATS resume:", e)
        raise HTTPException(status_code=500, detail=str(e))
