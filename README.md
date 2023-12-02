# typescript_crud
User Management System with TypeScript and PostgreSQL
This project implements a simple user management system using TypeScript and PostgreSQL. It includes functionality for user creation, login, updating user details, getting user information, and user deletion.

Prerequisites
Before getting started, make sure you have the following installed on your machine:

Node.js: Download and Install Node.js
TypeScript: Install using npm with npm install -g typescript
PostgreSQL: Download and Install PostgreSQL
Setup
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/your-repo.git
Install dependencies:

bash
Copy code
cd your-repo
npm install
Configure PostgreSQL:

Create a new database for the project.
Update the database connection details in src/config/db.ts.
Build the TypeScript code:

bash
Copy code
npm run build
Run the application:

bash
Copy code
npm start
Usage
The following operations are supported by the API:

1. Create User
Endpoint: POST /api/users

Request Body:

json
Copy code
{
  "username": "example",
  "password": "password123"
}
2. User Login
Endpoint: POST /api/login

Request Body:

json
Copy code
{
  "username": "example",
  "password": "password123"
}
3. Update User
Endpoint: PUT /api/users/:id

Request Body:

json
Copy code
{
  "username": "newusername",
  "password": "newpassword"
}
4. Get User
Endpoint: GET /api/users/:id

5. Delete User
Endpoint: DELETE /api/users/:id

Contributing
Feel free to contribute to this project by opening issues or creating pull requests. Your feedback is highly appreciated.

License
This project is licensed under the MIT License - see the LICENSE.md file for details
