# 🤖 AI Chat

A multi-persona AI chatbot built with Flask, Groq API, and Llama 3. Chat with 4 different AI personalities — each with a unique tone and style.

## Live Demo
👉 [ai-chatbot-sjuy.onrender.com](https://ai-chatbot-sjuy.onrender.com)

## Personas
- **Varahi** — Friendly & Warm · Kind, encouraging, and emotionally supportive
- **Vega** — Sharp & Direct · Cuts to the point with confident, efficient answers
- **Aruvi** — Calm & Flowing · Thoughtful, step-by-step, well-reasoned responses
- **Agni** — Bold & Fierce · Intense, motivating, and full of energy

## Features
- 4 distinct AI personas with unique personalities
- Persistent conversation history per persona
- Clean chat UI with typing indicator
- Fully responsive — works on desktop and mobile
- Dark mode support

## Tech Stack
- **Backend:** Python + Flask
- **AI:** Groq API + Llama 3.3 70B
- **Frontend:** Vanilla JS, HTML, CSS
- **Hosting:** Render (free tier)

## Run Locally
1. Clone the repo
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```
2. Install dependencies
   ```bash
   pip install -r requirements.txt
   ```
3. Create a `.env` file and add your Groq API key
   ```
   GROQ_API_KEY=your_key_here
   ```
4. Run the app
   ```bash
   python app.py
   ```
5. Open [http://localhost:5000](http://localhost:5000)