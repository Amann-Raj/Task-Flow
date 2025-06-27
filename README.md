# 🚀 Task-Flow: MERN Task Management App

Task-Flow is a modern, full-stack task management web application built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS. Easily create, read, update, and delete tasks with a beautiful and responsive UI.

---

## ✨ Features
- 📝 Create, update, and delete tasks
- 📋 View all tasks with priority, due date, and completion status
- 🌗 Light/dark theme toggle
- ⚡ Fast, responsive, and mobile-friendly UI
- 🔗 RESTful API with MongoDB backend
- 🧪 Robust automated backend test suite (unit, integration, API)

---

## 🧪 Testing
- **Stack:** Jest, Supertest, mongodb-memory-server, jest.mock
- **Types:**
  - Unit: Controller logic with mocked models
  - Integration: Real API + in-memory DB
  - API: End-to-end CRUD & error cases
- **How to run:**
  ```bash
  cd backend
  npm test
  ```
  - First run may download MongoDB for in-memory tests (one-time)
  - Coverage report auto-generated
- **Highlights:**
  - ✅ 100% safe: never touches your real DB
  - ✅ Covers all CRUD, error, and edge cases
  - ✅ Modern, maintainable test code

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Lucide Icons
- **Backend:** Node.js, Express, MongoDB, Mongoose

---

## 📁 Folder Structure
```
Task-Flow/
├── backend/           # Express + MongoDB API
│   ├── controllers/   # Route logic (CRUD)
│   ├── models/        # Mongoose schemas
│   ├── routes/        # Express routers
│   ├── server.js      # App entry point
│   └── .env           # Environment variables
└── frontend/          # React + Tailwind UI
    ├── src/
    │   ├── components/ # React components
    │   ├── contexts/   # React context providers
    │   └── App.jsx     # Main app
    └── ...
```

---

## ⚙️ Setup & Installation

### 1. **Clone the repository**
```bash
git clone https://github.com/your-username/task-flow.git
cd task-flow
```

### 2. **Backend Setup**
```bash
cd backend
npm install
```
- Create a `.env` file in `/backend`:
  ```
  MONGODB_URI=your_mongodb_connection_string
  PORT=5000
  ```
- Start the backend:
  ```
  node server.js
  ```

### 3. **Frontend Setup**
```bash
cd ../frontend
npm install
npm run dev
```
- Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧩 API Overview

### **Base URL:** `http://localhost:5000`

#### **GET /tasks**
- Retrieves all tasks.

#### **POST /tasks**
- Creates a new task.
- **Body Example:**
  ```json
  {
    "title": "Buy groceries",
    "description": "Milk, Bread, Eggs",
    "priority": "medium",
    "due_date": "2024-07-01",
    "completed": false
  }
  ```

#### **PUT /tasks/:id**
- Updates a task by ID.
- **Body Example:**
  ```json
  {
    "title": "Buy groceries (updated)",
    "completed": true
  }
  ```

#### **DELETE /tasks/:id**
- Deletes a task by ID.

---

## 🤖 API Testing with AI & CI/CD Integration

### 1. Create OpenAPI Schema
The backend API is fully documented using the OpenAPI (Swagger) standard. This schema describes all endpoints, request/response formats, and parameters for the Task-Flow API.

- **How it was created:**
  - Used `swagger-jsdoc` and `swagger-ui-express` in the Express backend.
  - Added JSDoc comments to all route files for automatic schema generation.
  - The OpenAPI docs are available at [`/api-docs`](https://task-flow-ipzc.onrender.com/api-docs) when the backend is running.
- **Example snippet:**
  ```yaml
  openapi: 3.0.0
  info:
    title: Task Flow API
    version: 1.0.0
  paths:
    /api/tasks:
      get:
        summary: Get all tasks
        responses:
          '200':
            description: List of tasks
      post:
        summary: Create a new task
        requestBody:
          required: true
          content:
            application/json:
              schema:
                type: object
                properties:
                  title:
                    type: string
                  description:
                    type: string
        responses:
          '201':
            description: Task created
  ```

### 2. API Testing using AI (Keploy)
- **How it was done:**
  - The OpenAPI schema and sample cURL commands were provided to the [Keploy AI API Testing platform](https://app.keploy.io/).
  - Keploy automatically generated a wide range of test scenarios, including edge cases and negative tests.
  - The backend was tested using these scenarios, and results were visualized in the Keploy dashboard.
- **Sample cURL commands used:**
  ```bash
  curl https://task-flow-ipzc.onrender.com/api/tasks

  curl -X POST https://task-flow-ipzc.onrender.com/api/tasks \
    -H "Content-Type: application/json" \
    -d '{"title":"Test 1","description":"Test task"}'

  curl -X PUT https://task-flow-ipzc.onrender.com/api/tasks/664aeb85bfa342e1a3cb6fc3 \
    -H "Content-Type: application/json" \
    -d '{"title":"Updated title"}'

  curl -X DELETE https://task-flow-ipzc.onrender.com/api/tasks/664aeb85bfa342e1a3cb6fc3
  ```
- **Test results:**
  - ![Keploy Test Report](./keploy-dashboard-screenshot.png)
  - The dashboard shows all test suites, accepted and rejected cases, and detailed assertions.

### 3. Integrate into CI/CD (GitHub Actions)
- **How it was done:**
  - A GitHub Actions workflow (`.github/workflows/ci.yml`) was created to automate API testing on every push and pull request.
  - The workflow installs dependencies, starts the backend, runs Keploy tests, and uploads test reports as artifacts.
- **Workflow file:** [View CI/CD Workflow](.github/workflows/ci.yml)
- **How it works:**
  1. On every push/PR, GitHub Actions spins up a fresh environment.
  2. Installs Node.js and backend dependencies.
  3. Starts the backend server.
  4. Runs Keploy in test mode to execute all generated API tests.
  5. Uploads Keploy reports for review.
- **Benefits:**
  - Ensures API quality and reliability on every code change.
  - Catches regressions and edge cases automatically.
  - Provides a visual dashboard for test results.

---

## 📑 API Documentation (Postman)

For detailed API usage, examples, and testing, check out the live Postman documentation:

👉 [Task-Flow Postman API Docs](https://documenter.getpostman.com/view/39293100/2sB2xBDVYX)

---

## 💡 Customization & Contribution
- Fork the repo and submit pull requests!
- Add new features, improve UI, or suggest enhancements.

---

## 📄 License
MIT
