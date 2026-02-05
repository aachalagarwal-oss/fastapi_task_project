from fastapi import APIRouter,Depends,HTTPException,status
from dependencies.auth import get_current_user
from typing import Annotated
from schemas import task
from models import task
from models.task import Task
from dependencies import db
import schemas
import models
from schemas.task import TaskResponse
from services.task_service import create_task,get_task,get_task_by_id,update_task,delete_task
from sqlalchemy.orm import Session
from typing import Optional,List



router=APIRouter(
    prefix="/tasks",
    tags=['tasks']
)


get_db=db.get_db

user_dependency=Annotated[dict,Depends(get_current_user)]


@router.post('/', status_code=status.HTTP_201_CREATED)
async def create_tasks(
    user: user_dependency,
    request: schemas.task.create_tasks,
    db: Session = Depends(get_db)
):
    try:
       
        return create_task(
            db=db,
            title=request.title,
            description=request.description,
            status=request.status,
            user_id=user.id
        )
    
    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get('/', response_model=List[TaskResponse])
async def get_tasks(user:user_dependency,db:Session=Depends(get_db),offset: int = 1, limit: int = 10):
    try:
        return get_task(db=db, user_id=user.id, limit=limit, offset=offset)
    

    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch tasks"
        )


@router.get('/{id}')
async def get_tasks(id:int,user:user_dependency,db:Session=Depends(get_db)):
    try:
        my_tasks=get_task_by_id(db=db,id=id,user_id=user.id)
        return my_tasks
    

    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch task"
        )
    

    



@router.put('/{id}')
async def update(id:int,user:user_dependency,request:schemas.task.create_tasks,db:Session=Depends(get_db)):
    try:
        return update_task(db=db,id=id,user_id=user.id,title=request.title,description=request.description,status=request.status)
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update task"
        )





@router.delete('/{id}')
async def delete(id:int,user:user_dependency,db:Session=Depends(get_db)):
    try:
        return delete_task(db=db,id=id,user_id=user.id)
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete task"
        )





