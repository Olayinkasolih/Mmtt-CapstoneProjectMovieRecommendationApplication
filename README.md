# 🎬 Movie Recommendation App

✅ React + Vite + Tailwind  
✅ Node.js + Express + MongoDB  
✅ JWT Authentication + Favorites  
✅ TMDB API Integration  

---

## 🔧 Setup

### Backend
```bash
cd backend
cp .env.example .env   # add MONGO_URI & JWT_SECRET
npm install
npm run dev
Frontend
bash
Copy
Edit
cd frontend
cp .env.example .env   # add VITE_API_URL & TMDB key
npm install
npm run dev
🌐 Features
✅ Register/Login with JWT Auth

✅ Search & Filter movies (year, rating, popularity)

✅ Add/Remove favorites

✅ Dashboard for saved favorites

✅ Responsive UI (Tailwind)

📡 API Endpoints
Auth

POST /api/auth/register → { name, email, password }

POST /api/auth/login → returns JWT

Favorites (Protected)

GET /api/favorites → List user favorites

POST /api/favorites/add → Save a movie { id, title, poster_path }

DELETE /api/favorites/remove/:movieId → Remove a movie

🚀 Deployment
Backend (Render)
Push backend folder to GitHub

Create new Render Web Service

Add MONGO_URI & JWT_SECRET in environment variables

Deploy → Get backend URL

Frontend (Netlify)
Push frontend folder to GitHub

Connect repo to Netlify

Add env VITE_API_URL (Render backend URL)

Deploy → Get live site

✅ Example Deployed Links
Backend: https://your-backend.onrender.com

Frontend: https://your-frontend.netlify.app

🏗 TODO (Future Enhancements)
Personalized recommendations

Watchlists & ratings

Social sharing

markdown
Copy
Edit

---

## ✅ 3. **Quick Deployment Guide**

**Backend → Render**
1. `git init && git push`
2. Go to [Render.com](https://render.com)
3. Create new → Web Service → Connect GitHub repo
4. Set `Build Command: npm install`
5. Set `Start Command: node server.js`
6. Add environment variables (`MONGO_URI`, `JWT_SECRET`)
7. Deploy → Get backend URL

**Frontend → Netlify**
1. Push frontend folder to GitHub
2. Go to [Netlify.com](https://netlify.com)
3. Connect repo → Deploy
4. Add `VITE_API_URL=https://your-backend.onrender.com/api`
5. Publish → Get frontend URL

---

✅ **With this upgrade:**  

✔ Sorting filters implemented  
✔ Add to Favorites integrated  
✔ Better README + API Docs  
✔ Deployment instructions added


Author: Hanafi Solihu Olayinka
