const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./models/Question');

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Question.deleteMany();
  const questions = [
    {
      question: "Which HTTP method is typically used to create a new resource on a server?",
      options: ["GET", "POST", "PUT", "DELETE"],
      correctIndex: 1
    },
    {
      question: "Which HTTP status code indicates that a resource was successfully created?",
      options: ["200", "201", "400", "404"],
      correctIndex: 1
    },
    {
      question: "In JWT (JSON Web Token), which part contains the payload (claims)?",
      options: ["Header", "Payload", "Signature", "Certificate"],
      correctIndex: 1
    },
    {
      question: "Which library is commonly used to securely hash passwords in Node.js?",
      options: ["jsonwebtoken", "bcrypt", "crypto-js", "express-session"],
      correctIndex: 1
    },
    {
      question: "In React, which hook is best suited for fetching data when a component mounts?",
      options: ["useState", "useEffect", "useMemo", "useContext"],
      correctIndex: 1
    },
    {
      question: "What does the Authorization header typically contain when sending a JWT?",
      options: ["Bearer <token>", "Authorization: <token>", "Token <token>", "JWT <token>"],
      correctIndex: 0
    },
    {
      question: "Which MongoDB aggregation stage is used to return a random sample of documents?",
      options: ["$match", "$project", "$sample", "$group"],
      correctIndex: 2
    },
    {
      question: "Which of the following best describes a controlled component in React?",
      options: [
        "A component that manages its own internal state without props",
        "A component where form data is handled by React state",
        "A component that always re-renders on every prop change",
        "A component that cannot use hooks"
      ],
      correctIndex: 1
    },
    {
      question: "Which HTTP status code means the client is not authorized and must authenticate?",
      options: ["400", "401", "403", "500"],
      correctIndex: 1
    },
    {
      question: "Which of these is the correct command to initialize a new Git repository locally?",
      options: ["git start", "git init", "git create", "git new"],
      correctIndex: 1
    },
    {
      question: "Which JavaScript array method returns a new array and does not mutate the original array?",
      options: ["forEach", "map", "push", "splice"],
      correctIndex: 1
    },
    {
      question: "What is the average time complexity of binary search on a sorted array of size n?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      correctIndex: 1
    },
    {
      question: "Which CORS-related header allows the server to indicate allowed origins?",
      options: ["Access-Control-Allow-Origin", "Allow", "Cross-Origin-Policy", "X-Frame-Options"],
      correctIndex: 0
    },
    {
      question: "Which practice helps prevent Cross-Site Scripting (XSS) attacks?",
      options: [
        "Storing passwords in plain text",
        "Sanitizing or escaping user-generated content before rendering",
        "Using long URLs",
        "Disabling HTTPS"
      ],
      correctIndex: 1
    },
    {
      question: "Which of the following databases is document-oriented and schema-flexible?",
      options: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
      correctIndex: 2
    },
    {
      question: "In Express.js, where should you place middleware that verifies JWTs so routes are protected?",
      options: [
        "After route handlers",
        "Before route handlers (applied to routes needing protection)",
        "Only in the frontend",
        "Only in the database layer"
      ],
      correctIndex: 1
    },
    {
      question: "Which of the following is a good way to manage environment-specific secrets in a Node app?",
      options: [
        "Hardcode them in source files",
        "Store them in .env and ensure .env is not committed to VCS",
        "Push them to the public repo readme",
        "Store them in client-side JavaScript"
      ],
      correctIndex: 1
    },
    {
      question: "When building the exam frontend, which storage option is commonly used to persist JWT between page reloads?",
      options: ["localStorage", "sessionStorage", "HTTP-only cookie", "All of the above (depending on implementation)"],
      correctIndex: 3
    }
  ];
  await Question.insertMany(questions);
  console.log('Questions seeded:', questions.length);
  await mongoose.connection.close();
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
