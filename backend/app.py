from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models import User
from schemas import SignupSchema, LoginSchema
from utils.password_helper import hash_password, verify_password
from db import SessionLocal, engine, Base
from fastapi.middleware.cors import CORSMiddleware

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
