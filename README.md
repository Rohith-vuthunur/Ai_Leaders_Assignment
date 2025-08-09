Student Online Exam System
About
The Student Online Exam System is a secure and responsive web application designed for students to take timed multiple-choice exams. It provides a smooth user experience with question navigation, countdown timer, and instant result calculation. Built with React.js, Node.js, and MongoDB, it ensures fast performance and robust authentication using JWT.

Features
User Registration & Login – Secure JWT-based authentication.

Start Exam Interface – Randomized question set for every attempt.

Question Navigation – Next/Previous functionality for smooth flow.

Countdown Timer – Auto-submits exam after 30 minutes.

Score Calculation – Instant result display after submission.

Responsive UI – Mobile-friendly interface using Bootstrap.

Tech Stack
Frontend: React.js, Bootstrap
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT (JSON Web Token)

Installation
Clone the repository
git clone https://github.com/Rohith_vuthunur/Ai_Leaders_Assignment
Navigate to project folder


cd foldername
Install dependencies


For backend:
cd backend
npm install


For frontend:
cd frontend
npm install


Setup environment variables in .env file for backend:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
Start backend server
cd backend
npm start


Start frontend
cd frontend
npm start


Usage
Register as a new student or log in with existing credentials.

Click Start Exam to begin.

Navigate through questions using Next/Previous buttons.

Submit the exam manually or wait for auto-submit when the timer runs out.

View your score instantly.

API Reference
You can test all APIs using the provided Postman collection.
Endpoints include:

POST /api/auth/register – Register a new user.

POST /api/auth/login – Login and get JWT token.

GET /api/questions – Fetch random questions.

POST /api/submit – Submit answers and get score.

Contributing
1.Fork the project.

2.Create your feature branch (git checkout -b feature/AmazingFeature).

3.Commit your changes (git commit -m 'Add some AmazingFeature').

4.Push to the branch (git push origin feature/AmazingFeature).

5.Open a Pull Request.

License:
This project is licensed under the MIT License.
