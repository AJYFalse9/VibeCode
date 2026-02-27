# Vibecoding Workshop Starter Template

Welcome to the Vibecoding Workshop Boilerplate! This repository provides a complete Monorepo setup with a modern web stack, ready for monolith deployment.

## Architecture & Tech Stack

- **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS, `next-themes`
- **Backend**: FastAPI (Python 3.11+), Pydantic
- **Deployment**: Monolith via Docker (FastAPI serves Next.js static files)

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or v20+)
- [Python](https://www.python.org/) (3.11+)
- [Docker](https://www.docker.com/)

---

## 🚀 Local Development (Manual Setup)

You can run the frontend and backend separately for the best development experience.

### 1. Start the Backend (FastAPI)

```bash
cd backend

# Create and activate virtual environment
python -m venv venv

# Windows: 
venv\Scripts\activate
# Mac/Linux: 
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Run server with auto-reload
uvicorn main:app --reload
```
The backend API will run at `http://localhost:8000`.

### 2. Start the Frontend (Next.js)

Open a new terminal window:

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```
The frontend will run at `http://localhost:3000`.

---

## 🐳 Local Development (Docker Compose)

If you prefer to run both environments via Docker:

```bash
docker compose up --build
```
- Frontend dev server: `http://localhost:3000`
- Backend API server: `http://localhost:8000`

---

## 🚢 Production Monolith Deployment

This project uses a multi-stage Dockerfile to build a monolith container where FastAPI serves the static compiled Next.js output.

```bash
# Build the monolith image
docker build -t vibecoding-starter .

# Run the container
docker run -p 8000:8000 vibecoding-starter
```

Then visit `http://localhost:8000` to see your monolith application running!

## API Endpoints

- `GET /api/health` - Healthcheck
- `GET /api/products` - Mock resource data
- `POST /api/auth/login` - Placeholder for login

Happy Vibecoding!
