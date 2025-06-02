# utils/ai.py

import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure the Gemini API key from environment variable
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Use the free-tier Gemini model
model = genai.GenerativeModel("gemini-1.5-flash")

def get_ai_response(user_query: str) -> str:
    """
    Generate an AI response to the user's query using the Gemini model.
    Returns the response text, or an error message if something goes wrong.
    """
    try:
        # Build the prompt for the AI model
        prompt = (
            "You're an expert assistant. Provide clear, concise, and informative answers.\n\n"
            f"User Question: {user_query}\n\n"
            "Answer:"
        )
        # Generate content using the model
        response = model.generate_content(prompt)
        # Return the AI's answer, stripped of leading/trailing whitespace
        return response.text.strip()
    except Exception as e:
        # Return error message if generation fails
        return f"Error generating response: {str(e)}"
