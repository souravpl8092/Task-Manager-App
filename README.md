# Task Manager App

## 📌 Overview
This is a **Task Manager Application** built using the **MERN Stack** with **TypeScript**. The app allows users to add, edit, delete, and filter tasks based on their status. The frontend is built with React, Redux, and Framer Motion for animations, while the backend handles authentication and CRUD operations.

<table>
<tr>
    <td>
      <h2 align="center">Home Page</h2>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://i.imgur.com/Payapej.png" alt="Home Page">
    </td>
  </tr>
</table>

<table>
<tr>
    <td>
      <h2 align="center">Sign up Page</h2>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://i.imgur.com/kK4hBBg.png" alt="signup Page">
    </td> 
  </tr>
</table>


<table>
<tr>
    <td>
      <h2 align="center">Login Page</h2>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://i.imgur.com/qJUfzf1.png" alt="Login Page">
    </td> 
  </tr>
</table>

<table>
<tr>
    <td>
      <h2 align="center">Create new task Form</h2>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://i.imgur.com/Ovfkg57.png" alt="Create new task Form">
    </td>
  </tr>
</table>

<table>
<tr>
    <td>
      <h2 align="center">Edit Form</h2>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://i.imgur.com/dNNepqi.png" alt="Edit Form">
    </td>
  </tr>
</table>

<table>
<tr>
    <td>
      <h2 align="center">TaskList Page large screen size view</h2>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://i.imgur.com/7ORkUhL.png" alt=">large screen size View">
    </td>
  </tr>
</table>

<table>
<tr>
    <td>
      <h2 align="center">TaskList Page medium screen size view</h2>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://i.imgur.com/ct6roH9.png" alt=">medium screen size View">
    </td>
  </tr>
</table>

<table>
<tr>
    <td>
      <h2 align="center">TaskList Page small screen size view</h2>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://i.imgur.com/zKZKzkf.png" alt=">small screen size View">
    </td>
  </tr>
</table>

<br/>

## 🚀 Features
- ✅ **Create, Read, Update, Delete (CRUD)** tasks
- 🔍 **Search and filter** tasks by name or status
- 🎨 **Smooth animations** using Framer Motion
- 🛡️ **Authentication & Authorization** (JWT-based)
- 📄 **Redux for state management**
- ⚡ **Optimized API calls** with loading indicators

## 📂 Folder Structure

```
TaskManagerApp/
│── server/               # Backend (Node.js + Express + MongoDB)
│   ├── controllers/      # Controller functions for handling requests
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Authentication & other middleware
│   ├── config/           # Database configuration
│   ├── server.ts         # Main server file
│
│── client/               # Frontend (React + TypeScript)
│   ├── public/           # Public assets (HTML, images, etc.)
│   ├── src/
│   │   ├── api/          # API functions for communicating with backend
│   │   ├── components/   # Reusable React components
│   │   ├── pages/        # Page components (TaskList, Login, Dashboard)
│   │   ├── routes/       # Routing configurations
│   │   ├── store/        # Redux store & slices
│   │   ├── styles/       # CSS styles
│   │   ├── utils/        # Utility functions (axios config)
│   │   ├── App.tsx       # Main application component
│   │   ├── index.tsx     # Entry point of React app
│
│── .gitignore             # Files to ignore in Git
│── package.json           # Dependencies and scripts
│── README.md              # Project documentation
│── tsconfig.json          # TypeScript configuration
```

## 🛠️ Tech Stack
- **Frontend:** React, TypeScript, Redux, Framer Motion
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Token)
- **State Management:** Redux Toolkit
- **Styling:** CSS, Framer Motion (for animations)

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/souravpl8092/Task-Manager-App.git
cd task-manager-app
```

### 2️⃣ Install Dependencies
#### Backend:
```sh
cd backend
npm install
```

#### Frontend:
```sh
cd frontend
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the `backend` directory and add:
```sh
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Run the Application
#### Start the Backend:
```sh
cd backend
npm run dev
```

#### Start the Frontend:
```sh
cd frontend
npm start
```

---

## API Endpoints
| Method | Endpoint         | Description              |
|--------|-----------------|--------------------------|
| POST   | /api/auth/login  | User login              |
| POST   | /api/auth/register | User registration   |
| GET    | /api/tasks       | Fetch all tasks         |
| POST   | /api/tasks       | Create a new task       |
| PUT    | /api/tasks/:id   | Update a task          |
| DELETE | /api/tasks/:id   | Delete a task          |

---


## 🔥 Usage
- Register/Login to access the dashboard.
- Add new tasks, edit them, delete them, or mark them as completed.
- Use the search bar to find specific tasks.
- Filter tasks by status (Pending/Completed).

## 📝 Contributing
If you want to contribute:
1. Fork the repository
2. Create a new branch (`feature-branch`)
3. Commit changes and push the branch
4. Open a pull request

## 📜 License
This project is licensed under the **MIT License**.

---

Made with ❤️ by **Sourav Paul**

