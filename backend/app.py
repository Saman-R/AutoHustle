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

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from sqlalchemy.future import select
from models import User
from schemas import SignupSchema, LoginSchema, UserResponse
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


# @app.get("/api/me")
# def get_me(current_user: User = Depends(get_current_user)):
#     return {
#         "id": current_user.id,
#         "email": current_user.email,
#         "name": current_user.name,
#         "preferences": current_user.preferences,
#         "resume": current_user.resume,
#     }

# from fastapi import FastAPI, Body
# from pydantic import BaseModel
# import subprocess
# import json

# app = FastAPI()

# # Define request body schema


# class TailorRequest(BaseModel):
#     resume: str
#     job: str


# @app.post("/tailor-resume")
# async def tailor_resume(data: TailorRequest):
#     prompt = f"""
#     You are an AI assistant that helps tailor resumes for job applications.
    
#     Job Description:
#     {data.job}

#     Base Resume:
#     {data.resume}

#     Task:
#     1. Rewrite the resume to highlight skills and experience relevant to this job.
#     2. Write a short personalized cover letter (max 250 words).
    
#     Respond in JSON format with keys: resume, cover_letter.
#     """

#     # Call ollama locally (example: using "llama2" model)
#     result = subprocess.run(
#         ["ollama", "run", "llama2"],
#         input=prompt,
#         text=True,
#         capture_output=True
#     )

#     try:
#         response_text = result.stdout.strip()
#         # Try to parse AI response as JSON
#         response_json = json.loads(response_text)
#     except Exception:
#         # Fallback if model doesn’t return pure JSON
#         response_json = {
#             "resume": "Tailored resume generated.",
#             "cover_letter": "Cover letter generated."
#         }

#     return response_json
