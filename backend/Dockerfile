# First stage: builder
FROM python:3.12.9 AS builder

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

# Create virtual environment
RUN python -m venv .venv

# Copy dependencies and install
COPY requirements.txt .
RUN .venv/bin/pip install --upgrade pip && .venv/bin/pip install -r requirements.txt

# Second stage: runtime
FROM python:3.12.9-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

# Copy virtual environment and project files
COPY --from=builder /app/.venv /app/.venv
COPY . .

# Expose port used by Uvicorn
EXPOSE 8000

# Start FastAPI app using Uvicorn (replace main:app if needed)
CMD ["/app/.venv/bin/uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
