This project is a simple backend Task Management system to understand how real production style APIs are structured and how authentication works in backend systems.

Features

User Registration

User Login (JWT Authentication)

Create Tasks

Update Tasks

Delete Tasks

Get User specific Tasks (Protected routes)

API flow explanation:
Program strats from main:
A. User Registration / Login
1.User sends request to /auth/register or /auth/login
2.Router calls service layer---
checks if user exists in DB
hashes password using passlib
saves user to database 
3.During login:
password is verified
JWT access token is generated
4.Token is returned to the user


B. Authentication 
1.User sends request with Authorization: Bearer <token>
2.FastAPI dependency get_current_user runs before endpoint
and extrats token decode it and fetches user from database


C.Task creation/updation/deletion/getall

1.Usere calls different endpoints like create_tasks,get_tasks,update_tasks
2.Accordingly that goes to the task_service layer
3. IN this layer we have al the logic related to database and adding or updating...if it finds an error it returns HTTP Excception accordingly
4.then it goes back to the endpoint and it returns accordingly.


D. Migrations

1.Models define structure
2.Alembic converts models → database tables
3.If model changes → new migration generated
4.Database stays in sync without deleting data




KEY LEARNINGS:

1. Service layer logic...Till now I was adding all the logic to the same function but now I learned how to seperate logic to keep code clean.
2. I learned about simple jwt beearer authentication as of while I was using OAuth2.
3. I leanred difference the authentication steps better.
4. I understood more about alembic.
