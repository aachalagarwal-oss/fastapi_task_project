from fastapi import Depends, HTTPException,Header
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from core.security import decode_access_token
from dependencies.db import get_db
from services.user_service import get_user_by_id
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials


bearer_scheme = HTTPBearer()
def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db)
):
    # print(credentials.scheme)       # "Bearer"
    # print(credentials.credentials)  # the actual token string
    token = credentials.credentials  # get the token automatically
    payload = decode_access_token(token)
    user_id = payload.get("sub")
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    return user



