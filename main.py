from fastapi import FastAPI
from routers import auth,user,task

app = FastAPI()

app.include_router(auth.router)
app.include_router(user.router)
app.include_router(task.router)