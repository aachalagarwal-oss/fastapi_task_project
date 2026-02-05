from fastapi import HTTPException
from sqlalchemy.orm import Session
from models.task import Task
import models

def create_task(db: Session, title: str, description: str, status: str, user_id: int):
    task = Task(
        title=title,
        description=description,
        status=status,
        user_id=user_id
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


    
def get_task(db: Session,user_id: int,limit:int=1,offset:int=1):
    query = db.query(models.task.Task).filter(models.task.Task.user_id == user_id)
    my_tasks = query.limit(limit).offset(offset).all()
    return my_tasks
    
 
def get_task_by_id(db: Session,user_id: int,id:int):
    my_tasks = db.query(models.task.Task).filter(models.task.Task.user_id == user_id,Task.id == id).first()
    if my_tasks is None:
        raise HTTPException(
            status_code=404,
            detail=f"No task with id {id} found for this user"
        )

    return my_tasks
    

def update_task(id:int,db: Session, title: str, description: str, status: str, user_id: int):
    
    task = db.query(Task).filter(
        Task.id == id,
        Task.user_id == user_id
    ).first()

    if task is None:
        raise HTTPException(
            status_code=404,
            detail=f"Task with id {id} not found"
        )


    task.title = title
    task.description = description
    task.status = status

    db.commit()
    db.refresh(task)

    return task

def delete_task(db: Session,user_id: int,id:int):
    my_tasks = db.query(models.task.Task).filter(models.task.Task.user_id == user_id,Task.id == id).first()
    if my_tasks is None:
        raise HTTPException(
            status_code=404,
            detail=f"No task with id {id} found for this user"
        )

    db.delete(my_tasks)
    db.commit()
    return 'The task is deleted'