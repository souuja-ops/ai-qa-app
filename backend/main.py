from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from utils.ai import get_ai_response

# Initialize FastAPI app with metadata
app = FastAPI(
    title="AI Q&A API",
    description="Ask questions and get answers using Gemini AI.",
    version="1.0.0"
)

# Enable CORS to allow requests from the frontend (localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or ["*"] for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the request body model for /ask endpoint
class Question(BaseModel):
    query: str

# Endpoint to handle user questions and return AI answers
@app.post("/ask")
async def ask_question(question: Question):
    try:
        # Get answer from AI utility function
        answer = get_ai_response(question.query)
        # If AI returns an error, raise HTTP 500
        if answer.startswith("Error"):
            raise HTTPException(status_code=500, detail=answer)
        # Return the answer as JSON
        return {"answer": answer}
    except Exception as e:
        # Catch any unexpected errors and return HTTP 500
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

# Simple health check endpoint
@app.get("/health", summary="Health check", response_description="API status")
def health_check():
    return {"status": "ok"}
