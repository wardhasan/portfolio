# 🌙 Ward Hasan — Personal Portfolio

Welcome to my digital playground — a portfolio that's more than just pixels and code.  
This is a space to explore my tech journey, share experiments, and hint at what’s coming next.

![Hero Image](./assets/img/eyes.png)

---

## 🚀 About the Project

This site is still in **its prologue phase**, a soft launch where the focus is on design, motion, and expression.  
Here’s what’s already live, and what’s coming soon.

### ✅ Built With
- HTML5 & CSS3 (Vanilla, SCSS-ready)
- JavaScript (Vanilla + jQuery for small interactions)
- Responsive Layouts
- Google Fonts: Roboto, Permanent Marker
- Anime-inspired elements & scratchy text animation

---

## ⚙️ Features
- Landing animation popup
- Responsive hero section with dynamic layout
- Story timeline (structured narrative blocks)
- Tech stack section (with cards)
- “My Work” coming soon with animated headline
- Future-ready structure for blog, contact, and project uploads

---

## 🧠 Know Yourself AI — Reflective Assistant

An interactive experiment inside the portfolio that integrates with an OpenAI-powered FastAPI backend.  
It helps users explore emotional questions, gain clarity, and reflect — safely, privately, and beautifully.

### 💡 How It Works
- You type a question (or choose a preset like “I feel stuck”)
- The frontend sends the prompt to your FastAPI backend
- The backend securely calls OpenAI and returns a thoughtful reply
- The conversation is rendered in a stylized, scrollable interface
- Users can share their reflections via clipboard, text file, email, or WhatsApp

### 🔧 Technologies
- FastAPI (Python) backend proxy
- OpenAI API (Chat Completions with GPT-4 or GPT-3.5)
- Vanilla JavaScript + DOM manipulation
- Custom dropdown UI & reflection sharing logic
- CORS-enabled backend communication

### 📦 Local Development (Frontend)
1. Make sure the FastAPI backend is running at http://localhost:8000  
2. Open `index.html` in a browser (or use Live Server)  
3. The AI chat section is under the “My Work” section  
4. Typing a question will trigger a POST request to `/chat`

> If you're using Live Server, ensure FastAPI CORS includes `http://127.0.0.1:5500`

---

## 📁 Folder Structure

├── assets/  
│ ├── css/ → Main stylesheets  
│ ├── img/ → Visual assets (e.g. eyes.png)  
│ └── scripts/ → JS interactions (chat, dropdowns, partials)  
├── index.html → Main homepage  
├── README.md  
├── .gitignore  
└── favicon.ico  

---

## 🌐 Deployment Notes

- Frontend can be deployed on GitHub Pages or Netlify
- Backend must be deployed separately (Render, Railway, Vercel Serverless)
- When deployed, update the `apiUrl` in `index.js` to your live backend endpoint

---

# 📜 License

This project is for personal and educational use. If you’re inspired by the layout or idea, feel free to fork and remix with credit.

---

## 🙋‍♂️ Who am I?

Hi, I’m Ward — aka “Bob the Builder” when it comes to creative problem-solving.  
More than just a backend dev, I’m building a space where my tech stories can live and evolve.

Thanks for visiting. Step into the journey.
