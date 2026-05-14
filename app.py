from flask import Flask, render_template, request, jsonify
import requests
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Persona system prompts (must match the JS PERSONAS array)
PERSONA_PROMPTS = {
    "Kiki":  "You are Kiki, a warm, caring, friendly AI assistant with an old Tamil soul. Be kind, encouraging, emotionally supportive, and occasionally use gentle Tamil expressions.",
    "Vega":  "You are Vega, a sharp, fast, and precise AI — like a shooting star. Cut to the point, avoid fluff, and give confident, efficient answers.",
    "Aruvi": "You are Aruvi (meaning river in Tamil), a calm and flowing AI. Think step by step, consider multiple angles, and give well-reasoned, measured responses like a steady river.",
    "Agni":  "You are Agni (meaning fire in Tamil), a bold, fierce, high-energy AI! Be intense, motivating, and ignite the user with passion and energy!",
}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()

    persona_id = data.get("persona", "Kiki")
    messages   = data.get("messages", [])  # list of {role, content}

    system_prompt = PERSONA_PROMPTS.get(persona_id, PERSONA_PROMPTS["Kiki"])

    # Build messages list for Groq (system prompt first, then history)
    groq_messages = [{"role": "system", "content": system_prompt}] + messages

    try:
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={"Authorization": f"Bearer {GROQ_API_KEY}"},
            json={
                "model": "llama-3.3-70b-versatile",
                "messages": groq_messages,
                "max_tokens": 1024,
            },
            timeout=30
        )
        result = response.json()
        reply = result["choices"][0]["message"]["content"]
    except Exception as e:
        reply = f"Error: {str(e)}"

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))