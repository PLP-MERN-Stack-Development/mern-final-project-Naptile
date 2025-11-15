MERN Task Manager
A full-stack task management web application built with the MERN stack (MongoDB, Express, React, Node.js) that allows users to register, login, create, update, delete, and manage tasks.

Table of Contents


Features


Tech Stack


Project Structure


Installation


Environment Variables


Running Locally


Deployment


Usage


Screenshots (optional)


License



Features


User Signup and Login with JWT authentication.


Protected routes for authenticated users.


Full CRUD operations for tasks:


Create tasks with title, description, status, and due date.


Read all tasks for logged-in user.


Update tasks (edit title, description, status, due date).


Delete tasks.




Mark tasks as completed.


Logout functionality.


Responsive and clean user interface.



Tech Stack


Frontend: React, Axios, React Router DOM


Backend: Node.js, Express.js


Database: MongoDB (Atlas or local)


Authentication: JSON Web Tokens (JWT)


Deployment: Render



Project Structure
mern-task-manager/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Dashboard.jsx
│   │   └── App.jsx
│   ├── public/
│   └── package.json
└── README.md


Installation


Clone the repository


git clone <repository_url>
cd mern-task-manager



Install backend dependencies


cd backend
npm install



Install frontend dependencies


cd ../frontend
npm install


Environment Variables
Create a .env file in backend/ with:
PORT=5000
MONGO_URI=<Your MongoDB URI>
JWT_SECRET=<Your JWT Secret>



PORT: Backend server port (default 5000)


MONGO_URI: MongoDB connection string


JWT_SECRET: Secret key for JWT authentication



Running Locally
Backend
cd backend
npm run dev

Frontend
cd frontend
npm start



Open your browser: http://localhost:3000


Backend API runs on http://localhost:5000



Deployment on Render


Backend (Web Service)


Connect GitHub repo → select backend folder


Build command: npm install


Start command: npm start


Add environment variables: MONGO_URI, JWT_SECRET




Frontend (Static Site)


Connect GitHub repo → select frontend folder


Build command: npm install && npm run build


Publish directory: build




Update frontend Axios URLs to your backend Render URL:


axios.get("https://<backend-url>.onrender.com/api/tasks");


Usage


Signup with email and password.


Login to access the dashboard.


Add tasks with title, description, status, and due date.


Edit or delete tasks as needed.


Mark tasks as completed.


Logout when done.



