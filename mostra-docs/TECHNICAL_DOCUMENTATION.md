# Technical Documentation

## Landing Page - São Paulo International Film Festival (Mostra SP)

**Version 1.0 | October 2025**

---

## 1. PROJECT OVERVIEW

### 1.1 Objective

Responsive, mobile-first landing page that centralizes information for the São Paulo International Film Festival, providing intelligent search and filtering for current screenings.

### 1.2 Problem Statement

The official website publishes fragmented scheduling (only 4 days at a time) without efficient search/filter tools. This application aggregates data and enhances usability.

---

## 2. TECHNICAL ARCHITECTURE

### 2.1 Tech Stack

**Frontend:**
- **Vite** 5.x (modern build tool, fast dev server)
- **Vanilla JavaScript** (ES6+, no frameworks)
- **Tailwind CSS** 3.x (utility-first CSS)
- **Google Fonts** (Sora font family)

**Backend:**
- **Firebase Hosting** (static hosting)
- **Cloud Functions** (Node.js 20, serverless scraping)
- **Firestore** (NoSQL real-time database)
- **Cloud Scheduler** (automated cron jobs)

**External APIs:**
- **TMDB API** (The Movie Database - free ratings)
- **mostra.org** (scraping via Cheerio/Puppeteer)

### 2.2 Data Structure (Firestore)

**Collection:** `filmes`

**Document schema:**

```json
{
  "id": "auto-generated-id",
  "titulo": "Anatomy of a Fall",
  "diretor": "Justine Triet",
  "sinopse": "A woman is suspected...",
  "pais": "France",
  "duracao": 152,
  "nota": 7.8,
  "sessoes": [
    { 
      "sala": "Room 1", 
      "data": "2025-10-20", 
      "horario": "19:00" 
    }
  ]
}
```

---

## 3. DESIGN & UX

### 3.1 Color Palette

**Semi-Cool Dark Theme with Neon-Pastel Accents**

| Variable        | Value                    |
|-----------------|--------------------------|
| --bg-primary    | #0f1419 (near-black blue)|
| --accent-blue   | #7dd3fc (pastel-neon blue)|
| --accent-pink   | #f9a8d4 (pastel pink)    |
| --text-primary  | #e2e8f0 (soft white)     |

### 3.2 Responsive Layout

**Mobile (< 768px):**
- 1-column card grid
- Collapsed header (smaller title)
- Filters in modal/drawer

**Desktop (> 1024px):**
- 3-column card grid
- Fully expanded layout

---

## 4. DETAILED FEATURES

### 4.1 Intelligent Search

**Features:**
- Real-time search (300ms debounce)
- Suggestions with preview (title + director)
- Fuzzy matching (typo tolerance)
- Keyboard navigation (↑↓ + Enter)

### 4.2 Filter System

**Available categories:**

| Filter    | Options                                              |
|-----------|------------------------------------------------------|
| Director  | All unique directors (alphabetical)                  |
| Room      | Available screening rooms                            |
| Country   | Countries of origin (alphabetical)                   |
| Duration  | < 90 min, 90-120 min, 120-150 min, > 150 min       |
| Time      | Morning, Afternoon, Evening, Late Night              |
| Rating    | 9-10, 7-8.9, 5-6.9, 3-4.9, < 3                      |

**Application logic:**
- Multi-select (checkboxes within dropdowns)
- AND logic between categories
- OR logic within same category

---

## 5. DEVELOPMENT ROADMAP

### PHASE 1: Setup & Foundation (2 days)

1. Create Git repository
2. Initialize Vite project
3. Configure Tailwind CSS
4. Configure Firebase (Hosting, Functions, Firestore)
5. Create folder structure
6. Configure ESLint + Prettier

**Deliverable:** Project running locally (`npm run dev`)

### PHASE 2: Frontend - Static UI (3 days)

1. Implement Header + Subheader
2. Create SearchBar component (no logic)
3. Create FilterPanel component (no logic)
4. Create FilmeCard component with mock data
5. Implement responsive grid (1/2/3 columns)
6. Style with Tailwind
7. Add CSS animations
8. Test responsiveness (mobile/tablet/desktop)

**Deliverable:** Complete visual landing page with fake data

### PHASE 3: Firebase Setup (1 day)

1. Create project in Firebase Console
2. Configure Firestore (production mode)
3. Create 'filmes' collection with test documents
4. Configure security rules
5. Obtain TMDB API key

**Deliverable:** Firebase configured and accessible

### PHASE 4: Frontend ↔ Firebase Integration (2 days)

1. Create Firebase configuration file
2. Implement Firestore real-time listener
3. Replace mock data with real data
4. Implement loading state and error handling

**Deliverable:** App consuming Firestore data in real-time

### PHASE 5: Search & Filter Features (3 days)

1. Implement search logic (debounce, fuzzy match, autocomplete)
2. Implement filter logic (multi-select, AND/OR logic)
3. Implement sorting by next session
4. Test all filter combinations

**Deliverable:** Functional search/filter system

### PHASE 6: Backend - Web Scraping (4 days)

1. Analyze mostra.org HTML structure
2. Create scraping function with Puppeteer
3. Implement TMDB API integration
4. Implement merge/update logic in Firestore
5. Deploy Cloud Functions

**Deliverable:** Functional scraper running on Firebase

### PHASE 7: Automation & Scheduling (1 day)

1. Configure Cloud Scheduler (runs every 12h)
2. Monitor logs and configure notifications

**Deliverable:** Automatic updates functioning

### PHASE 8: Polish & Optimization (2 days)

1. Optimize performance (lazy loading, minification)
2. Add meta tags (SEO, Open Graph)
3. Test accessibility
4. Create comprehensive README

**Deliverable:** Polished and optimized app

### PHASE 9: Deploy & Launch (1 day)

1. Production build
2. Deploy to Firebase Hosting
3. Test in production

**Deliverable:** App live in production! 🎉

---

## 6. COSTS & SCALABILITY

### 6.1 Firebase Free Tier

**Free limits:**
- Firestore: 1GB storage, 50k reads/day, 20k writes/day
- Cloud Functions: 2M invocations/month, 400k GB-s compute
- Hosting: 10GB transfer/month

**Estimated project usage:**
- ~100 films x 2KB = 200KB storage
- ~500 reads/day (well below limit)
- Scraper: 2 invocations/day

**Conclusion:** 100% free with huge room for growth.

---

## 7. QUICK COMMANDS

### Development:
```bash
npm run dev        # Start dev server
npm run build      # Production build
```

### Firebase:
```bash
firebase login             # Authenticate
firebase init              # Initialize project
firebase deploy            # Full deploy
firebase functions:log     # View logs
```

### Git:
```bash
git add .
git commit -m "feat: add search"
git push origin main
```

---

## 8. FUTURE IMPROVEMENTS (V2)

- **Authentication:** Login to save favorite films
- **Notifications:** Push notifications for new films
- **Map:** Google Maps to locate screening rooms
- **Calendar:** Add session to Google Calendar
- **Trailers:** YouTube trailer embeds
- **Posters:** Film images (via TMDB)

---

## 9. RESOURCES & USEFUL LINKS

### Documentation:
- Vite: https://vitejs.dev/
- Tailwind CSS: https://tailwindcss.com/
- Firebase: https://firebase.google.com/docs
- TMDB API: https://developers.themoviedb.org/3
- Puppeteer: https://pptr.dev/
