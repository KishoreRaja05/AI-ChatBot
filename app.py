from flask import Flask, render_template, request
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

@app.route("/", methods=["GET", "POST"])
def chat():
    reply = None
    if request.method == "POST":
        user_message = request.form["message"]
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={"Authorization": f"Bearer {GROQ_API_KEY}"},
            json={
                "model": "llama-3.3-70b-versatile",
                "messages": [{"role": "user", "content": user_message}]
            }
        )
        data = response.json()
        reply = data["choices"][0]["message"]["content"]
    return render_template("index.html", reply=reply)

if __name__ == "__main__":
    app.run(debug=True)