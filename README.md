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
