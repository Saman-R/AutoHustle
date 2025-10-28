from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any

class SignupSchema(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginSchema(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        orm_mode = True


class PersonalInfo(BaseModel):
    name: str = ""
    email: str = ""
    linkedin: str = ""
    github: str = ""


class Education(BaseModel):
    institution: str = ""
    degree: str = ""
    year: str = ""


class Experience(BaseModel):
    company: str = ""
    role: str = ""
    duration: str = ""
    description: str = ""


class ResumeRequest(BaseModel):
    personal_info: PersonalInfo
    job_description: str
    education: list[Education] = []
    experience: list[Experience] = []
    certifications: list[str] = []
    soft_skills: list[str] = []
    hard_skills: list[str] = []
