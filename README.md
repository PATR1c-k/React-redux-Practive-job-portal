# 💼 MERN Job Portal

A full-stack job portal built using the MERN (MongoDB, Express, React, Node.js) stack. It supports role-based access for **Employers** and **Job Seekers** with full CRUD operations and authentication.

---

## 🚀 Features

- 👤 User Registration and Login (JWT-based authentication)
- 🧑‍💼 Employer Dashboard
  - Post new jobs
  - View and manage own job listings
- 🙋‍♂️ Seeker Dashboard
  - View available jobs
  - Apply to jobs (extendable)
- 📦 CRUD operations on:
  - Users
  - Companies
  - Jobs
  - Applications
- 🔐 Protected Routes (role-based access)
- 🎨 Responsive UI built with Material UI
- 🔄 State management using Redux

---

## 🛠️ Tech Stack

| Layer    | Technology                       |
| -------- | -------------------------------- |
| Frontend | React, Redux, Material UI, Axios |
| Backend  | Node.js, Express, JWT, bcrypt    |
| Database | MongoDB + Mongoose ODM           |
| Tooling  | Vite, Postman, Nodemon           |

---

## 📁 Folder Structure

├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js
├── frontend/
│ ├── src/
│ │ ├── actions/
│ │ ├── reducers/
│ │ ├── components/
│ │ └── pages/
│ └── vite.config.js

yaml
Copy
Edit

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/job-portal-mern.git
cd job-portal-mern
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Create a .env file inside the backend/ directory

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 3. Start the backend server

```bash
npm run dev
```

### Frontend Setup

```bash
cd ../frontend
npm install
```

### Add proxy settings to vite.config.js

```bash
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});


-------------

npm run dev
```

---

Let me know if you’d like a matching **design document** or **PowerPoint presentation** based on this project — I can generate them right away.
