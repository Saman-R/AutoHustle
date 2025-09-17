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
    resume: Optional[str] = None
    preferences: Optional[dict] = None

    class Config:
        orm_mode = True
