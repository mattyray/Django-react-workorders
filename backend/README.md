# 🛠️ React + Django Work Order Management System

This is a full-stack work order management system built with **Django REST Framework** on the backend and **React + Vite + Tailwind CSS** on the frontend. It allows teams to create, manage, and schedule work orders with event-based calendar integration and is fully containerized using Docker.

### 🚀 Live Demo
[https://django-react-workorders.herokuapp.com](https://django-react-workorders.herokuapp.com)

---

## 📦 Tech Stack

**Backend:**
- Django 5.1.6
- Django REST Framework
- PostgreSQL (Dockerized)
- Gunicorn + Whitenoise for production
- Docker + Heroku Container Stack

**Frontend:**
- React (with Vite)
- Tailwind CSS
- React Router
- Axios (for API requests)

**Deployment:**
- Heroku (Docker container stack)
- Docker Compose for local dev and production
- Environment variables via `django-environ`

---

## 📁 Features

### ✅ Work Orders
- Create, edit, delete work orders
- Attach notes and files
- Status tracking (pending, scheduled, completed)

### 📅 Calendar Scheduling
- Dynamic **event-based scheduling**
- Events have a type (pickup, delivery, install, etc.)
- Calendar views with dates from the Event model

### 📨 API Integration
- React frontend interacts with DRF API
- Axios-based services for all CRUD operations

### 🔐 Authentication
- Prepared for Google SSO integration via `django-allauth`
- Currently configured for local access

### 🌐 Production-Ready
- Gunicorn WSGI server
- Whitenoise for static files
- Environment-secure deployment

---

## 🔧 Local Development

### 1. Clone and setup environment
```bash
git clone https://github.com/yourusername/react-django-workorders.git
cd react-django-workorders
cp backend/.env.example backend/.env  # create and edit your secrets
