from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.user import User
from core.security import hash_password, verify_password, create_access_token
from sqlalchemy.exc import IntegrityError

def create_user(db: Session, email: str, password: str) -> User:
    new_user = User(email=email, password_hash=hash_password(password), is_active=True)
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user

    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=409,
            detail="Email already registered"
        )

def authenticate_user(db: Session, email: str, password: str) -> str | None:
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password_hash):
        return None
    return create_access_token({"sub": str(user.id)})

def get_user_by_id(db: Session, user_id: int) -> User | None:
    return db.query(User).filter(User.id == user_id).first()


