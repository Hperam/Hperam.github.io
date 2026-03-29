# Commerce Copilot

Commerce Copilot is a multimodal shopping assistant built to showcase:

- grounded product recommendations instead of hallucinated suggestions
- text, voice, and image-driven discovery flows
- a clean full-stack architecture that is realistic for AI product teams

## What it does

- accepts typed shopping requests
- supports browser voice input where available
- accepts an uploaded reference image for style-aware reasoning
- ranks products from a local catalog before calling the model
- returns structured recommendations, tradeoffs, follow-up questions, and a share card

## Stack

- Node.js
- Express
- OpenAI Responses API
- vanilla HTML, CSS, and JavaScript

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Copy the example env file:

```bash
cp .env.example .env
```

3. Add your OpenAI API key to `.env`:

```bash
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4.1-mini
PORT=3000
```

4. Start the app:

```bash
npm run dev
```

5. Open:

```text
http://localhost:3000
```

## Notes

- If `OPENAI_API_KEY` is not set, the app still works in a catalog-grounded fallback mode.
- Voice input depends on browser support for the Web Speech API.
- The image is kept in browser memory and sent only with the current recommendation request.

## Why this project is strong for recruiters

- It demonstrates practical RAG-style grounding, not just prompt wrapping.
- It uses structured outputs to keep recommendation rendering predictable.
- It shows product thinking, backend logic, and frontend polish in one codebase.
