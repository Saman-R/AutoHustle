from pydantic import BaseModel, EmailStr
from db import Base
from sqlalchemy import Column, Integer, String, JSON, DateTime, Text, func, ForeignKey


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)                # user's name
    email = Column(String, unique=True, index=True)
    resume = Column(Text)                # parsed resume text
    preferences = Column(JSON)           # job preferences stored as JSON
    hashed_password = Column(String)

