# Virtual Assistant System

## Overview
A production-ready virtual assistant web application with voice recognition, AI-powered responses (Google Gemini API), user authentication, and customizable assistant avatars. Built with React (frontend) and Node.js/Express/MongoDB (backend).

---

## System Architecture

**Frontend:**
- React (Vite)
- Context API for global state
- Voice recognition (Web Speech API)
- Text-to-speech
- User authentication (Sign Up/Sign In)
- Assistant customization (image, name)
- AI chat interface

**Backend:**
- Node.js + Express
- MongoDB (Mongoose)
- JWT authentication (HTTP-only cookies)
- REST API for auth, user, assistant
- Cloudinary for image uploads
- Gemini API integration for AI responses

**Diagram:**
```
[User] <-> [React Frontend] <-> [Express Backend] <-> [MongoDB]
                                      |
                                 [Gemini API]
                                      |
                                 [Cloudinary]
```

---

## Flow Diagram

1. **User Registration/Login**
   - User signs up/signs in via frontend forms
   - Backend validates, hashes password, issues JWT cookie
2. **Assistant Customization**
   - User selects/uploads image, sets assistant name
   - Image uploaded to Cloudinary (if custom)
   - Data saved in MongoDB
3. **Voice Interaction**
   - User speaks to assistant (Web Speech API)
   - Frontend sends command to backend
   - Backend calls Gemini API, parses response
   - Response returned, spoken aloud (TTS)
   - Special commands (search, open apps) handled by frontend
4. **History**
   - User commands saved in MongoDB
   - Displayed in UI

---

## Database Design

**MongoDB User Schema:**
- `name`: String (required)
- `email`: String (required, unique)
- `password`: String (hashed)
- `assistantName`: String
- `assistantImage`: String (URL)
- `history`: [String] (array of commands)
- `timestamps`: createdAt, updatedAt

**Relations:**
- Each user has one assistant (name/image)
- Each user has a history of commands

---

## Production Considerations
- **Environment Variables:** All secrets/keys in `.env` (never commit)
- **Security:**
  - Passwords hashed (bcrypt)
  - JWT in HTTP-only cookies
  - CORS configured
  - Input validation
- **Scalability:**
  - Stateless backend (JWT)
  - Cloudinary for media
  - Gemini API for AI
- **Error Handling:**
  - Consistent error responses
  - Logging
- **Frontend:**
  - Responsive UI
  - Accessibility (voice, keyboard)
  - Optimized assets
- **Backend:**
  - Modular routes/controllers/middleware
  - Async/await for all DB/API calls

---

## Setup & Run

1. **Clone repo**
2. **Configure `.env`** (see sample)
3. **Install dependencies**
   - Backend: `npm install` in `backend/`
   - Frontend: `npm install` in `frontend/`
4. **Start servers**
   - Backend: `npm start` or `node index.js` in `backend/`
   - Frontend: `npm run dev` in `frontend/`
5. **Access app**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:8000](http://localhost:8000)

---

## Technologies Used
- React, Vite, Context API
- Node.js, Express
- MongoDB, Mongoose
- JWT, bcrypt
- Cloudinary
- Gemini API
- Web Speech API

---

## Folder Structure
```
virtualAssistant/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── config/
│   ├── gemini.js
│   ├── index.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   └── package.json
```

---

## License
MIT

---

## Author
Premkumar
