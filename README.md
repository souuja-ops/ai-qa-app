
# AI-Powered Q&A System

This is a full-stack AI-powered Question & Answer web application built with **FastAPI** (backend) and **Next.js** (frontend). It uses **Gemini LLM** via the `GEMINI_API_KEY` for answering user questions.

---

## 🗂️ Project Structure

```

ai-qa-app/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── utils/
│   │   └── ai.py            # Logic to interact with Gemini API
│   ├── requirements.txt     # Python dependencies
│   └── .env.example         # Environment variable template
├── frontend/
│   ├── pages/
│   │   └── index.js         # Main chat UI
│   ├── styles/              # CSS modules
│   ├── public/              # Static assets
│   ├── components/          # UI components
│   ├── package.json         # JS dependencies
│   └── .env.local.example   # Frontend env config template (if needed)
└── README.md

````

---

## 🚀 Getting Started

### Backend (FastAPI)

#### Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ````

2. Create a virtual environment and activate it:

   ```bash
   python -m venv venv
   source venv/bin/activate  # For Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Create your `.env` file from the example:

   ```bash
   cp .env.example .env
   ```

5. Add your Gemini API key to `.env`:

   ```
   GEMINI_API_KEY=your_api_key_here
   ```

6. Run the FastAPI backend:

   ```bash
   uvicorn main:app --reload
   ```

The backend will run on `http://localhost:8000`

---

### Frontend (Next.js)

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. (Optional) Add a `.env.local` file if your app needs environment variables.

4. Start the development server:

   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:3000`

---

## 💡 Prompts Used

The application uses the following types of prompts to query the Gemini LLM:

### Example Prompt:

> What documents do I need to travel from Kenya to Ireland?

### Additional Prompt Examples:

* What is the process for applying for a Schengen visa?
* Can you explain how photosynthesis works?
* What’s the capital of Kazakhstan and its main attractions?
* How do I set up a CI/CD pipeline using GitHub Actions?
* What are the best practices for securing a cloud infrastructure?

These examples are included to guide users and testers on the kind of queries to expect and test.

---

## 🌍 Environment Variables

The application requires the following environment variable:

### `.env` for Backend

```
GEMINI_API_KEY=your_api_key_here
```

> This key is used to authenticate requests to the Gemini Large Language Model API.

---

## 🛠 Technologies Used

* **Frontend**: Next.js, React, CSS Modules
* **Backend**: FastAPI, Python
* **LLM**: Gemini API (by Google)
* **Icons**: react-icons
* **Markdown**: react-markdown

---

## 📜 License

MIT License © 2025 Samuel Gicho

