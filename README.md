
# 📰 Fullstack Blog Platform – FastAPI + Next.js

````md

A Blog app built with:

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, NextAuth.js
- **Backend**: FastAPI + SQLAlchemy
- **Auth**: GitHub/Google OAuth with protected routes
- **Features**: Markdown, comments, admin dashboard

---

## 🗂️ Project Structure

```txt
.
├── backend/               # FastAPI backend (API, DB models)
└── frontend/              # Next.js frontend (UI, Auth, pages)
````

---

## ⚙️ Backend Setup (FastAPI)

### 1. Navigate into the backend folder

```bash
cd backend
```

### 2. Create and activate a virtual environment

```bash
python -m venv env
source env/bin/activate        # macOS/Linux
# OR
.\env\Scripts\activate         # Windows
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the backend server

```bash
uvicorn app.main:app --reload
```

* API base URL: `http://localhost:8000`
* Swagger Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

> ⚠️ If you switch to PostgreSQL, update `DATABASE_URL` in `.env` or `app/database.py`.

---

## 🌐 Frontend Setup (Next.js)

### 1. Navigate into the frontend folder

```bash
cd frontend
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Create `.env.local`

```env
# .env.local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_super_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

> Get GitHub credentials here: [https://github.com/settings/developers](https://github.com/settings/developers)
> Or Google: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

### 4. Run the frontend server

```bash
npm run dev
```

* Frontend URL: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Auth Setup

* Built with **NextAuth.js**
* Supports **GitHub** and **Google OAuth**(in dev)
* `/dashboard` is protected using `middleware.ts`
* Auth status handled with `SessionProvider`

---

## ✨ Features

* ✅ Full blog platform with FastAPI backend
* ✅ GitHub/Google login
* ✅ Admin dashboard with session check
* ✅ Tailwind CSS
* ✅ Markdown rendering with `react-markdown`
* ✅ Comments system with API submission
* ✅ Axios with interceptors for API calls
* ✅ Responsive layout, SPA routing, and SSR

---

## 🧪 Quick Commands

| Action                | Command                           |
| --------------------- | --------------------------------- |
| Run FastAPI backend   | `uvicorn app.main:app --reload`   |
| Run Next.js frontend  | `npm run dev`                     |
| Install backend deps  | `pip install -r requirements.txt` |
| Install frontend deps | `npm install`                     |

---