# Use official Python image as base
FROM python:3.10.4-slim-bullseye

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIP_DISABLE_PIP_VERSION_CHECK=1

# Set work directory
WORKDIR /code

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy entire backend project
COPY . .

# ✅ Ensure staticfiles directory exists for WhiteNoise NEW ! CHECK FOR RUNTIME PROBLEMS
RUN mkdir -p /code/staticfiles

# ✅ FIXED: use shell form so $PORT is evaluated correctly
CMD ["sh", "-c", "gunicorn django_project.wsgi --bind 0.0.0.0:$PORT"]
