from pydantic import BaseModel
from enum import Enum
from datetime import datetime
class TaskStatus(str,Enum):
    pending="pending"
    in_progress="in_progress"
    completed="completed"

class create_tasks(BaseModel):
    title:str
    description:str
    status:TaskStatus=TaskStatus.pending
    
class TaskResponse(BaseModel):
    title:str
    description:str
    status:str
    created_at:datetime

