# 🤖 AI ChatBot

A multi-persona AI chatbot built with Flask, Groq API, and Llama 3. Chat with 4 different AI personalities — by text or by voice.

## Live Demo
👉 [ai-chatbot-sjuy.onrender.com](https://ai-chatbot-sjuy.onrender.com)

## Personas
- **Varahi** — Friendly & Warm
- **Vega** — Sharp & Direct
- **Aruvi** — Calm & Flowing
- **Agni** — Bold & Fierce

## Features
- 4 distinct AI personas, each with its own personality and system prompt
- **Voice input** — speak your message instead of typing (mic button)
- **Voice output** — AI replies read aloud, with a different voice per persona (toggle via speaker icon)
- Dark mode with persistent preference
- Mobile-friendly persona switcher (bottom sheet)
- Markdown rendering in chat responses
- Splash screen to smooth over cold starts on Render's free tier

## Tech Stack
- Python + Flask (backend)
- Groq API + Llama 3.3 (AI)
- Vanilla JS, HTML, CSS (frontend)
- Web Speech API (`SpeechRecognition` + `SpeechSynthesis`) for voice — runs entirely in the browser, no extra backend or API cost
- Render (deployment)

## Voice Notes
- Voice input/output uses the browser's built-in Web Speech API — works best in Chrome and Edge. Firefox/Safari support is more limited.
- Available voices depend on the user's OS/browser, so persona voice variety may differ across devices.

## Run Locally
1. Clone the repo
2. Install deps: `pip install -r requirements.txt`
3. Add your key to `.env`: `GROQ_API_KEY=your_key_here`
4. Run: `python app.py`