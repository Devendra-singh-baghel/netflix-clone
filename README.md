# 🎬 Netflix Clone  

A **Netflix Clone** built with **React.js, Vite, Tailwind CSS, Firebase, and TMDB API**, featuring user authentication, responsive design, detailed movie pages, and video streaming.  

**Live Demo**: [Netflix Clone](https://netflix-clone-seven-opal-69.vercel.app/)  

---

## Features  

- **User Authentication** – Sign up, log in, and logout with Firebase Authentication.  
- **Secure Firestore Rules** – User data is protected with Firebase security rules.  
- **Dynamic Movie Data** – Fetched in real-time from **TMDB API**.  
- **Movie Detail Page** – Shows rating, release date, genres, budget, revenue, production companies, and more.  
- **Video Player** – Integrated YouTube trailer player.  
- **Recommendations** – Related movies displayed dynamically.  
- **Responsive UI** – Netflix-like design, mobile and desktop ready.  
- **Modern UI/UX** – Tailwind CSS for styling with hover effects, gradients, and animations.  

---

## Tech Stack  

- **Frontend**: React.js (Vite) + Tailwind CSS  
- **Backend / Services**: Firebase (Authentication, Firestore)  
- **API**: [TMDB API](https://www.themoviedb.org/documentation/api)  
- **Deployment**: Vercel  

---

## Setup & Installation  

1. **Clone repo**  
    - git clone https://github.com/Devendra-singh-baghel/netflix-clone.git
    - cd netflix-clone

2. **Install dependencies**  
    - npm install

3. **Create .env file**

    - **Add your Firebase + TMDB API keys**:

    - VITE_FIREBASE_API_KEY=your_api_key
    - VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    - VITE_FIREBASE_PROJECT_ID=your_project_id
    - VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    - VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    - VITE_FIREBASE_APP_ID=your_app_id
    - VITE_TMDB_ACCESS_TOKEN=your_tmdb_access_token

4. **Run development server**
    - npm run dev

5. **Build for production**
    - npm run build

---

## Deployment

- **Hosted on Vercel**

- Firebase Authentication & Firestore configured with authorized domains
- TMDB API integrated securely via environment variables
- SPA routing handled using vercel.json rewrite rules

---

## Future Improvements

- Add search functionality with suggestions
- Implement watchlist/favorites
- Multi-language support
- Add TV shows browsing & filtering

---

## Author

**Devendra Singh Baghel**
- Aspiring Frontend Developer

- GitHub: [@Devendra-singh-baghel](https://github.com/Devendra-singh-baghel)   
- LinkedIn: [Devendra Singh Baghel](https://linkedin.com/in/devendra-singh-baghel-267023351)
- Email: [devendrabaghel0220@gmail.com]
