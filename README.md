# Task Manager Backend 
- FrontEnd - https://github.com/jhyche80-jpg/Fullstack-Project-Frontend
## Table of Contents
1. [Overview](#overview)  
   1. [Features](#features)  
   
2. [Problem](#problem)  
   1. [Goal Breakdown](#goal-breakdown)  
   2. [Questions and Answers](#questions-and-answers)  
   3. [Input](#input)  
   4. [Output](#output)  
3. [Build Steps](#build-steps)  
4. [Troubleshooting](#troubleshooting)  
   1. [Problems](#problems)  
   2. [Solutions](#solutions)  
5. [Reflection](#reflection)  
6. [References](#references)  
   1. [Programs Used](#programs-used)  
   2. [Websites Used](#websites-used)  

---

## Overview
You are a full-stack developer hired by a growing startup to lead the development of their new flagship product, “Pro-Tasker”. The vision is to create a modern, collaborative project management tool that is intuitive for single users but powerful enough for small teams. The application must be built from the ground up using the MERN stack, showcasing a secure, robust, and feature-rich backend API, a dynamic and responsive React frontend, and a seamless deployment pipeline.

### Features
 - User Management:
    - As a new user, I can create an account and log in.
    - As a logged-in user, my session is managed securely, and I can log out.
- Project Management:
    - As a logged-in user, I can create new projects, giving them a name and description.
    - I can view a dashboard of all the projects I have created.
    - I can view the details of a single project.
    - I can update or delete only the projects that I own.
- Task Management:
    - Within a project I own, I can create new tasks with a title, description, and status (e.g., ‘To Do’, ‘In Progress’, ‘Done’).
    - I can view all tasks belonging to a specific project.
    - I can update the details or status of any task within a project I own.
    - I can delete tasks from a project I own.
- Collaboration (Stretch Goal):
    - As a project owner, I can invite other registered users to collaborate on my project.
    - As a collaborator, I can view and update tasks within a project I’ve been invited to.
---

## Problem

### Goal Breakdown
-  Backend (Node.js, Express, MongoDB)
    - Modular API: Structure your API with a clear separation of concerns (e.g., models, routes, controllers, middleware).
    - RESTful Endpoints: Design and implement a full suite of RESTful API endpoints for Users, Projects, and Tasks.
    - Database Schemas: Create robust Mongoose schemas for User, Project, and Task models, establishing clear relationships using ref.
    - Authentication: Implement secure user registration and login using JWTs. All sensitive routes must be protected.
    - Authorization: Implement strict, ownership-based authorization. A user must only be able to view or modify data they own. This is the most critical security requirement.
    - Password Security: Hash all user passwords using bcrypt before storing them in the database, preferably using a pre-save hook in your User model.

### Questions and Answers
List important questions and answers that helped guide the build.

Example:  
Q: How should input be collected  
A: Use a controlled form field  

Q: How do I validate the data  
A: Check input format and length  

### Input
1. Auth Router 


| Action       | Method | Input (body/query)                         | Output (response) |
|--------------|--------|-------------------------------------------|-----------------|
| Register     | POST   | `{ username, email, password, birthDate }` | `{ user: { id, username, email, role }, token }` |
| Login        | POST   | `{ username/email, password }`             | `{ user: { id, username, email, role }, token }` |
| Logout       | POST   | JWT token in header/cookie                 | `{ message: "Logged out successfully" }` |

2. Project Router 


| Action       | Method | Input (body/query)                           | Output (response)                                                 |
|--------------|--------|----------------------------------------------|-------------------------------------------------------------------|
| Create         | POST   | `{ title, due-date , time due and status }`| `{projectId, dueDate and additonal information}`                  | 
| Delete         | Delete | `{ projectId }` param                      | `{message: "Project deleted sussessfully!"}`                      |
| Veiw Projects  | GET    | ` req.user`  (from JWT)                    | `{projectId, title of project, and Project due date of project }` |
| View Project   | GET    | `projectId `  param, `req.user`            | ` projectId task, project details`                                | 
| Update Project | PATCH  | `accountUserId`                            |  Updated Project information                                      |

3. Task router 

| Action       | Method | Input (body/query)                         | Output (response) |
|--------------|--------|-------------------------------------------|-----------------|
| Create       | POST   | `{ username, email, password, birthDate }` | `{taskId, title, deescription, duedate , and time}`               | 
| Delete       | Delete | `{taskId }` param                          | `{message: 'Task deleted' }`                  |
| Veiw Tasks   | GET    | ` req.project`                             | `{taskId, title of task, and task due date of task }`             |
| Update Task  | PATCH  | `taskId`                                   |  Updated Task information                                         |

## Step by Step Plan
1. Initalize Project 
2. Install core Packages 
3. Install Dev dependentcies 
4. Install security packages 
    - helmet 
5. Plan project Folder structure 
6. User roles and permissons 
7. Make the Models 
    - User 
    - Project 
    - Tasks  
    - Login 
    - Blacklist 
8. Make the middleware
    - authMiddleware 
9. Make the router 
    - authRouter 
    - projectRouter
    - taskRouter 
10. Make and test the controller for the givven router 
11. Test the backend in its entreity 
---

## Troubleshooting
### Problems
List specific problems you faced.

1.  I am getting a type error for my server.js:
    - TypeError('argument handler must be a function')
    - Referncing the router 
    - Looks like the router didnt get imported correctly 
    - Routes are correct
    
2.  Creating a project under a specific name
    - I am not connecting the task to the user
3.  The put request is not working
    - it kept saying " User not found or you are not authorized

### Solutions
Explain how you solved each problem.

1.  I first tested if the route was somehow flawed byt importing the rout directly into the `app.use()` area. After that I looked at each of the my routers and seen that I didn't export my routes.
2.   I wasnt calling task
3.  In the code I was not using the specific param name. 

---

## Reflection
Seen on the front-end  version on github (linked at the top of the page)

---

## References

### Programs Used  
- VS Code  
- Node.js   
- Postman  
- Helmet
- cors 



### Websites Used
- MDN  
- Stack Overflow  
- W3Schools  















